import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('production API and health preserve upstream URI, beta remains proxied',()=>{
  const nginx=readFileSync('deploy/nginx/stormforge.conf','utf8');
  for(const location of ['location ^~ /v1/','location = /healthz']) {
    const block=nginx.slice(nginx.indexOf(location)).split('}')[0];
    assert.match(block,/proxy_pass https:\/\/127\.0\.0\.1:19443;/);
    assert.match(block,/proxy_set_header Host \$host;/);
  }
  assert.match(nginx,/proxy_pass https:\/\/127\.0\.0\.1:18443;/);
  assert.match(nginx,/try_files \$uri \$uri\/ =404;/);
  assert.doesNotMatch(nginx,/proxy_pass https:\/\/127\.0\.0\.1:19443\//);
});

test('all public HTML download paths share the website and package URLs use the release service', () => {
  const site = readFileSync('deploy/nginx/stormforge.conf', 'utf8');
  assert.match(site, /include \/etc\/nginx\/snippets\/stormhub-downloads\.conf;/);
  assert.match(site, /include \/etc\/nginx\/snippets\/stormforge-site-download-pages\.conf;/);
  const downloads = readFileSync('deploy/nginx/stormforge-site-download-pages.conf', 'utf8');
  const rewrites = [...downloads.matchAll(/^rewrite (\S+) (\S+) last;$/gm)]
    .map(([, pattern, target]) => ({ pattern: new RegExp(pattern), target }));
  const targetFor = path => rewrites.find(route => route.pattern.test(path))?.target;
  for (const path of ['/download/', '/downloads', '/downloads/', '/downloads/index.html']) {
    assert.equal(targetFor(path), '/download/index.html');
  }
  for (const path of ['/downloads/channels/dist/hub/windows-x64.json', '/downloads/releases/beta/editor/2026-11-21/windows-x64.json', '/downloads/packages/beta/hub/file.zip', '/downloads/blobs/digest']) {
    assert.equal(targetFor(path), undefined);
  }
  assert.match(downloads, /location = \/download\/index\.html \{\s*root \/srv\/stormforge-site\/current;/);
});
