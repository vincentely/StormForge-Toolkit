import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
function files(dir) { return readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)]); }
let count = 0;
for (const file of files('dist').filter(f => f.endsWith('.html'))) {
  const html = readFileSync(file,'utf8');
  const route = file.replaceAll('\\','/').replace(/^dist/, '').replace(/index\.html$/, '');
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(value, `https://stormforge.vollagames.com${route}`);
    if (url.origin !== 'https://stormforge.vollagames.com') continue;
    const target = resolve('dist', '.' + decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    if (!existsSync(target)) throw new Error(`${file}: missing ${value}`);
    if (url.hash && target.endsWith('.html') && !readFileSync(target,'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) throw new Error(`${file}: missing anchor ${value}`);
    count++;
  }
}
console.log(`Internal links/assets: ${count} passed.`);
