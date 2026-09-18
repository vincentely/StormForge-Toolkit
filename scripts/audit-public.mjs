import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files','-z'], {encoding:'utf8'}).split('\0').filter(Boolean);
if (!files.length) throw new Error('No tracked files to audit; stage reviewed source first.');
const forbidden = /(?:^|\/)(?:node_modules|dist|build|Library|LocalData|CascCache|Binaries|Intermediate|Saved|Temp|secrets|\.env[^/]*)(?:\/|$)|\.(?:exe|dll|pdb|zip|7z|rar|tar|gz|db|sqlite\d*|pem|key|pfx|p12|uasset|sfmb|ktx2)$/i;
const secrets = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /gh[pousr]_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{40,}/, /AKIA[0-9A-Z]{16}/, /(?:password|client_secret|api_key)\s*[:=]\s*["'][^"'\s]{12,}["']/i];
for (const file of files) {
  if (forbidden.test(file)) throw new Error(`Forbidden public file: ${file}`);
  if (statSync(file).size > 1024*1024) throw new Error(`Public file exceeds 1 MiB: ${file}`);
  const text = readFileSync(file,'utf8');
  if (secrets.some(pattern => pattern.test(text))) throw new Error(`Possible secret: ${file}`);
}
console.log(`Public audit passed for ${files.length} tracked files (paths, size, common secret patterns). Manual provenance review still required.`);
