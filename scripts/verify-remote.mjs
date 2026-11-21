import { createHash } from 'node:crypto';
import { desktopArchive, desktopPackages } from './desktop-releases.mjs';
import { readChannel } from './manifest.mjs';

const artifacts = [
  ...desktopPackages.map(p => ({ ...p, filename: p.url.split('/').at(-1),
    urls: [desktopArchive(p.product, p.channel, p.version), p.url] })),
  ...['stable', 'beta'].flatMap(ch =>
    (readChannel(ch)?.artifacts ?? []).map(a => ({ ...a, urls: [a.primary_url, a.github_url] }))),
];

let count = 0;
for (const artifact of artifacts) {
  for (const url of new Set(artifact.urls)) {
    const signal = AbortSignal.timeout(600000);
    let response = await fetch(url, { redirect: 'manual', signal });
    // Only the approved GitHub Release endpoint may redirect to its asset CDN.
    if (response.status === 302 && new URL(url).hostname === 'github.com') {
      const target = new URL(response.headers.get('location'));
      if (target.protocol !== 'https:' || target.hostname !== 'release-assets.githubusercontent.com' ||
          target.username || target.password || target.port) throw new Error('Unexpected asset CDN');
      await response.body?.cancel();
      response = await fetch(target, { redirect: 'error', signal });
    }
    if (response.status !== 200 || !response.body) throw new Error(`Download failed: ${url} (${response.status})`);
    const hash = createHash('sha256');
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > artifact.size_bytes) throw new Error(`Download exceeds declared size: ${url}`);
      hash.update(chunk);
    }
    if (size !== artifact.size_bytes || hash.digest('hex') !== artifact.sha256) {
      throw new Error(`Remote integrity mismatch: ${url}`);
    }
    console.log(`Verified ${artifact.filename} from ${new URL(url).hostname}`);
    count++;
  }
}
console.log(`${count} remote artifacts verified.`);
