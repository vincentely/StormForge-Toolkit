import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { validateManifest, readChannel, verifyArtifacts } from './manifest.mjs';
const args = process.argv.slice(2);
if (args.length && (args.length !== 3 || args[0] !== '--verify')) throw new Error('Usage: --verify manifest.json artifact-directory');
if (args.length) {
  const manifest = validateManifest(JSON.parse(readFileSync(args[1], 'utf8')));
  await verifyArtifacts(manifest, args[2]);
  console.log('Verified release artifact bytes, sizes and SHA-256.');
} else {
  for (const name of readdirSync('release/examples')) {
    if (name.endsWith('.json')) validateManifest(JSON.parse(readFileSync(`release/examples/${name}`, 'utf8')), { example: true });
  }
  if (existsSync('release/manifests')) {
    for (const name of readdirSync('release/manifests')) if (!['stable.json', 'beta.json'].includes(name)) throw new Error(`Unexpected manifest: ${name}`);
  }
  for (const channel of ['stable', 'beta']) console.log(`${channel}: ${readChannel(channel) ? 'metadata validated (artifact bytes require --verify)' : 'no public release'}`);
}
