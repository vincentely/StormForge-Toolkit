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
