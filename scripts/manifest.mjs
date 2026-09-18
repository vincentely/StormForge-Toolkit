import { readFileSync, existsSync, createReadStream, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const schema = JSON.parse(readFileSync(resolve('release/schema/manifest.v1.schema.json'), 'utf8'));
const validate = ajv.compile(schema);
const hosts = new Set(['stormforge.vollagames.com', 'github.com']);
/**
 * @typedef {{kind: string, platform: string, architecture: string, filename: string, size_bytes: number, sha256: string, primary_url: string, github_url: string, source_commit: string}} Artifact
 * @typedef {{schema: string, channel: string, version: string, published_at: string, release_notes_url: string, artifacts: Artifact[]}} Manifest
 */
/** @returns {Manifest} */
export function validateManifest(data, { example = false, channel } = {}) {
  if (!validate(data)) throw new Error(ajv.errorsText(validate.errors));
  if (channel && channel !== data.channel) throw new Error('Manifest channel mismatch');
  if ((data.channel === 'stable') === data.version.includes('-')) throw new Error('Stable requires final version; beta requires prerelease version');
  if (!example && Date.parse(data.published_at) > Date.now()) throw new Error('Release cannot be published in the future');
  const urls = [data.release_notes_url, ...data.artifacts.flatMap(a => [a.primary_url, a.github_url])];
  for (const value of urls) {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash || url.search) throw new Error('Unsafe release URL');
    if (!(example ? url.hostname === 'example.invalid' : hosts.has(url.hostname))) throw new Error('Unapproved release host');
    if (!example && url.hostname === 'github.com' && !url.pathname.startsWith('/vincentely/StormForge-Toolkit/releases/')) throw new Error('Unapproved GitHub repository');
  }
  const names = new Set();
  for (const a of data.artifacts) {
    if (a.filename.includes('..') || !a.filename.includes(data.version) || names.has(a.filename.toLowerCase())) throw new Error('Ambiguous filename or missing version');
    names.add(a.filename.toLowerCase());
    for (const value of [a.primary_url, a.github_url]) {
      if (new URL(value).pathname.split('/').at(-1) !== a.filename) throw new Error('URL filename mismatch');
    }
    if (!example && !a.github_url.startsWith('https://github.com/vincentely/StormForge-Toolkit/releases/download/')) throw new Error('GitHub asset must be a Release download');
  }
  return /** @type {Manifest} */ (data);
}
export function readChannel(channel) {
  if (!['stable', 'beta'].includes(channel)) throw new Error('Unknown channel');
  const file = resolve('release/manifests', `${channel}.json`);
  if (!existsSync(file)) return null;
  return validateManifest(JSON.parse(readFileSync(file, 'utf8')), { channel });
}
export async function verifyArtifacts(manifest, directory) {
  for (const a of manifest.artifacts) {
    const file = resolve(directory, a.filename);
    if (statSync(file).size !== a.size_bytes) throw new Error(`Size mismatch: ${a.filename}`);
    const hash = createHash('sha256');
    for await (const chunk of createReadStream(file)) hash.update(chunk);
    if (hash.digest('hex') !== a.sha256) throw new Error(`SHA-256 mismatch: ${a.filename}`);
  }
}
