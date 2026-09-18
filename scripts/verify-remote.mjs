import { createHash } from 'node:crypto';
import { readChannel } from './manifest.mjs';
let count=0;
for (const channel of ['stable','beta']) {
  const manifest=readChannel(channel);
  if(!manifest) continue;
  for(const a of manifest.artifacts) {
    for(const url of new Set([a.primary_url,a.github_url])) {
      // Only the approved GitHub Release endpoint may redirect to its asset CDN.
      let response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(60000)});
      if(response.status===302 && new URL(url).hostname==='github.com') {
        const target=new URL(response.headers.get('location'));
        if(target.protocol!=='https:' || target.hostname!=='release-assets.githubusercontent.com' || target.username || target.password || target.port) throw new Error('Unexpected asset CDN');
        await response.body?.cancel();
        response=await fetch(target,{redirect:'error',signal:AbortSignal.timeout(600000)});
      }
      if(response.status!==200 || !response.body) throw new Error(`Download failed: ${url} (${response.status})`);
      const hash=createHash('sha256');let size=0;
      for await(const chunk of response.body) {
        size+=chunk.length;
        if(size>a.size_bytes) throw new Error(`Download exceeds declared size: ${url}`);
        hash.update(chunk);
      }
      if(size!==a.size_bytes || hash.digest('hex')!==a.sha256) throw new Error(`Remote integrity mismatch: ${url}`);
      console.log(`Verified ${a.filename} from ${new URL(url).hostname}`);count++;
    }
  }
}
console.log(count ? `${count} remote artifacts verified.` : 'No public manifests: no remote artifacts claimed as verified.');
