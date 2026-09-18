import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const base='http://127.0.0.1:4321';
const out='artifacts/visual';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {});
const results=[];
try {
  for (const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['narrow',320,740]]) {
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror', e=>errors.push(e.message));
    for (const route of ['/', '/features/', '/download/', '/docs/', '/privacy/', '/terms/', '/contact/']) {
      const response=await page.goto(base+route);
      if(!response?.ok()) throw new Error(`HTTP failure: ${route}`);
      await page.locator('h1').waitFor();
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      if(overflow) throw new Error(`Overflow ${name} ${route}`);
      if(await page.locator('h1').count()!==1) throw new Error('Expected one h1');
      if(await page.locator('img:not([alt])').count()) throw new Error('Missing alt');
      if(route==='/download/') {
        if(await page.getByText('尚未公开发布',{exact:true}).count()!==2) throw new Error('Missing release fallback');
        if(await page.locator('a[href$=".zip"], a[href$=".exe"]').count()) throw new Error('Unexpected fake download');
      }
      if(name!=='narrow') await page.screenshot({path:`${out}/${name}-${route==='/'?'home':route.replaceAll('/','')}.png`,fullPage:true});
      results.push({viewport:name,route,overflow:false});
    }
    await page.goto(base);
    await page.keyboard.press('Tab');
    if(!await page.locator('.skip').evaluate(el=>el===document.activeElement)) throw new Error('Skip link is not first keyboard target');
    await page.keyboard.press('Enter');
    if(!page.url().endsWith('#main')) throw new Error('Skip link target failure');
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error(`Text enlargement overflow ${name}`);
    if(errors.length) throw new Error(errors.join('\n'));
    await page.close();
  }
  writeFileSync(`${out}/checks.json`,JSON.stringify({checks:results,keyboard:'passed',textEnlargement:'passed',pageErrors:[]},null,2)+'\n');
  console.log(`${results.length} page/viewport checks passed, keyboard and 200% text checks passed.`);
} finally { await browser.close(); }
