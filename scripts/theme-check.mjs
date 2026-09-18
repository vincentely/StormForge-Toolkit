import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {});
const base = 'http://127.0.0.1:4321';
mkdirSync('artifacts/visual', { recursive: true });
const background = page => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
const colors = { light: 'rgb(247, 248, 250)', dark: 'rgb(17, 21, 25)' };
try {
  const context = await browser.newContext({ colorScheme: 'light' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  assert.equal(await background(page), colors.light);
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await background(page), colors.dark);
  await page.selectOption('#theme-select', 'light');
  assert.equal(await background(page), colors.light);
  await page.reload();
  assert.equal(await background(page), colors.light);
  await page.goto(`${base}/docs/`);
  assert.equal(await page.locator('#theme-select').inputValue(), 'light');
  const other = await context.newPage();
  await other.goto(base);
  await page.selectOption('#theme-select', 'dark');
  await other.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  assert.equal(await background(other), colors.dark);
  await page.selectOption('#theme-select', 'system');
  assert.equal(await page.evaluate(() => localStorage.getItem('stormforge-theme')), null);
  await page.emulateMedia({ colorScheme: 'light' });
  assert.equal(await background(page), colors.light);
  for (const theme of ['light', 'dark']) {
    await page.selectOption('#theme-select', theme);
    for (const [name, width, height] of [['desktop', 1440, 1000], ['tablet', 900, 1000], ['mobile', 390, 844], ['narrow', 320, 740]]) {
      await page.setViewportSize({ width, height });
      for (const route of ['/', '/features/', '/download/', '/docs/', '/privacy/', '/terms/', '/contact/']) {
        await page.goto(base + route);
        assert.equal(await background(page), colors[theme]);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${theme} ${name} ${route}`);
      }
      if (name === 'desktop' || name === 'mobile') {
        await page.goto(base);
        await page.screenshot({ path: `artifacts/visual/${theme}-${name}.png` });
      }
    }
  }
  assert.deepEqual(errors, []);
  await context.close();
  // System colors must work even without JavaScript or persistent storage.
  for (const theme of ['light', 'dark']) {
    const noJs = await browser.newPage({ javaScriptEnabled: false, colorScheme: theme });
    await noJs.goto(base);
    assert.equal(await background(noJs), colors[theme]);
    await noJs.close();
  }
  const restricted = await browser.newPage({ colorScheme: 'light' });
  await restricted.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  await restricted.goto(base);
  await restricted.selectOption('#theme-select', 'dark');
  assert.equal(await background(restricted), colors.dark);
  console.log('Theme checks passed: system changes, manual override, persistence, navigation, cross-tab sync, no JS, blocked storage and 56 page/theme/viewport combinations.');
} finally {
  await browser.close();
}
