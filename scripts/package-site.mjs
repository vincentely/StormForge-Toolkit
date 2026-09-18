import { mkdirSync, readdirSync, lstatSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const sha = execFileSync('git',['rev-parse','--short=12','HEAD'],{encoding:'utf8'}).trim();
if (execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim()) throw new Error('Commit reviewed source before packaging.');
function inspect(dir) {
  for(const name of readdirSync(dir)) {
    const file=join(dir,name), s=lstatSync(file);
    if(s.isSymbolicLink()) throw new Error(`Symlink forbidden: ${file}`);
    if(s.isDirectory()) inspect(file);
    else if(!/\.(html|css|js|json|svg|png|webp|jpg|txt|xml|ico|woff2)$/.test(name)) throw new Error(`Unexpected website file: ${file}`);
  }
}
inspect('dist');
mkdirSync('artifacts',{recursive:true});
const name=`stormforge-site-${sha}.tar.gz`, path=join('artifacts',name);
execFileSync('tar',['-czf',path,'-C','dist','.'],{stdio:'inherit'});
const bytes=readFileSync(path), hash=createHash('sha256').update(bytes).digest('hex');
writeFileSync(`${path}.sha256`,`${hash}  ${name}\n`);
writeFileSync(`${path}.json`,JSON.stringify({source_commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),filename:name,size_bytes:bytes.length,sha256:hash},null,2)+'\n');
console.log(`${path}: ${bytes.length} bytes, SHA-256 ${hash}`);
