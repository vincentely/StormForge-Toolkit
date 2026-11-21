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

test('website download page and live archive listing have independent origins', () => {
  const site = readFileSync('deploy/nginx/stormforge.conf', 'utf8');
  assert.match(site, /include \/etc\/nginx\/snippets\/stormhub-downloads\.conf;/);
  assert.match(site, /include \/etc\/nginx\/snippets\/stormforge-site-download-pages\.conf;/);
  const downloads = readFileSync('deploy/nginx/stormforge-site-download-pages.conf', 'utf8');
  const location = route => downloads.split(`location = ${route} {`)[1].split('}')[0];
  for (const route of ['/download/', '/downloads/']) {
    assert.ok(downloads.includes(`rewrite ^${route}$ ${route}index.html last;`));
  }
  assert.match(location('/download/index.html'), /root \/srv\/stormforge-site\/current;/);
  assert.match(location('/downloads/index.html'), /root \/srv\/stormforge;/);
});
