import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { validateManifest, verifyArtifacts, readChannel } from '../scripts/manifest.mjs';
const fixture = () => JSON.parse(readFileSync('release/examples/beta.example.json', 'utf8'));
test('example is explicit, production refuses it', () => {
  assert.equal(validateManifest(fixture(), {example:true}).channel, 'beta');
  assert.throws(() => validateManifest(fixture()));
});
for (const [name, change] of [
  ['uppercase SHA', m => m.artifacts[0].sha256 = 'A'.repeat(64)],
  ['zero size', m => m.artifacts[0].size_bytes = 0],
  ['traversal', m => m.artifacts[0].filename = '../bad.zip'],
  ['HTTP', m => m.artifacts[0].primary_url = m.artifacts[0].primary_url.replace('https:', 'http:')],
  ['URL mismatch', m => m.artifacts[0].primary_url += '.exe'],
  ['credentials', m => m.artifacts[0].primary_url = m.artifacts[0].primary_url.replace('https://', 'https://user:pass@')],
  ['stable prerelease', m => m.channel = 'stable'],
  ['duplicate', m => m.artifacts.push({...m.artifacts[0]})],
  ['unknown field', m => m.secret = 'not-allowed'],
]) test(`reject ${name}`, () => {
  const m = fixture(); change(m); assert.throws(() => validateManifest(m, {example:true}));
});
test('production host, version and channel enforcement', () => {
  const m = fixture(); m.release_notes_url = 'https://github.com/vincentely/StormForge-Toolkit/releases/tag/v0.0.0-example.1';
  const a = m.artifacts[0];
  a.primary_url = `https://stormforge.vollagames.com/downloads/${a.filename}`;
  a.github_url = `https://github.com/vincentely/StormForge-Toolkit/releases/download/v0.0.0-example.1/${a.filename}`;
  validateManifest(m, {channel:'beta'});
  assert.throws(() => validateManifest(m, {channel:'stable'}));
  a.github_url = a.github_url.replace('vincentely', 'someone');
  assert.throws(() => validateManifest(m));
});
test('verify actual bytes and reject tampering', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'stormforge-manifest-'));
  try {
    const m = fixture(), a = m.artifacts[0], bytes = Buffer.from('synthetic validation fixture');
    a.size_bytes = bytes.length; a.sha256 = createHash('sha256').update(bytes).digest('hex');
    writeFileSync(join(dir, a.filename), bytes);
    await verifyArtifacts(m, dir);
    writeFileSync(join(dir, a.filename), Buffer.alloc(bytes.length));
    await assert.rejects(() => verifyArtifacts(m, dir), /SHA-256/);
    writeFileSync(join(dir, a.filename), 'short');
    await assert.rejects(() => verifyArtifacts(m, dir), /Size/);
  } finally { rmSync(dir, {recursive:true, force:true}); }
});
test('unknown channels fail', () => assert.throws(() => readChannel('dev')));
