import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const output = 'test-results';
await mkdir(output, { recursive: true });
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5174', '--strictPort'], { stdio: 'pipe' });
let serverLog = '';
server.stdout.on('data', data => { serverLog += data; });
server.stderr.on('data', data => { serverLog += data; });
let browser;
try {
let ready = false;
for (let attempt = 0; attempt < 60; attempt++) {
  if (server.exitCode !== null) throw new Error(`Test server failed: ${serverLog}`);
  try { const response = await fetch('http://127.0.0.1:5174/'); if (response.ok) { ready = true; break; } } catch {}
  await delay(100);
}
assert.ok(ready, `Test server did not start: ${serverLog}`);
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
const errors = [];
const failedRequests = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure() }));
await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
assert.match(await page.locator('h1').innerText(), /Inteligência analítica e ciência de dados/);
assert.equal(await page.locator('.service-card').count(), 4);
assert.match(await page.locator('#dados').innerText(), /baseline com lideranças/);
assert.match(await page.locator('#dados').innerText(), /Lei de Acesso à Informação/);
await page.locator('.term-guide summary').click();
assert.equal(await page.locator('.term-guide').evaluate(el => el.open), true);
assert.match(await page.locator('.term-guide').innerText(), /semelhança de significado/);
await page.locator('.term-guide summary').click();
await page.getByRole('navigation').getByRole('link', { name: 'Dados e pesquisa' }).click();
assert.equal(new URL(page.url()).hash, '#dados');
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
const desktopAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

for (let i = 0; i < 4; i++) {
  await page.locator(`[data-service="${i}"]`).click();
  await page.locator('dialog').waitFor({ state: 'visible' });
  assert.equal(await page.locator('dialog li').count(), 3);
  if (i === 1) {
    await page.locator('#dialog-contact').click();
    assert.equal(await page.locator('select[name="interest"]').inputValue(), 'Preparação de dados e servidores MCP');
  } else {
    await page.keyboard.press('Escape');
  }
  assert.equal(await page.locator('dialog').isVisible(), false);
}
await page.getByRole('tab', { name: 'Regulação', exact: true }).click();
assert.match(await page.locator('#flow-content').innerText(), /NLP e análise preditiva/);
await page.keyboard.press('ArrowRight');
assert.equal(await page.getByRole('tab', { name: 'Inteligência artificial', exact: true }).getAttribute('aria-selected'), 'true');
assert.match(await page.locator('#flow-content').innerText(), /Engenharia de dados \+ MCP/);
await page.keyboard.press('Home');
assert.equal(await page.getByRole('tab', { name: 'Território', exact: true }).getAttribute('aria-selected'), 'true');
await page.locator('[data-interest="Radar Legislativo & Análise de Risco Regulatório"]').click();
assert.equal(await page.locator('select[name="interest"]').inputValue(), 'Radar Legislativo & Análise de Risco Regulatório');
await page.locator('button[type="submit"]').click();
assert.equal(await page.locator('input[name="name"]').evaluate(el => el.validity.valueMissing), true);
assert.equal(await page.locator('#form-status').innerText(), '');
await page.locator('input[name="name"]').fill('   ');
assert.equal(await page.locator('input[name="name"]').evaluate(el => el.validity.customError), true);
await page.locator('textarea[name="message"]').fill('          ');
assert.equal(await page.locator('textarea[name="message"]').evaluate(el => el.validity.customError), true);
await page.locator('input[name="name"]').fill('Pessoa de teste');
await page.locator('input[name="email"]').fill('pessoa@example.org');
await page.locator('textarea[name="message"]').fill('Gostaria de discutir um projeto de indicadores ambientais.');
await page.evaluate(() => {
  const observer = new MutationObserver(records => { for (const record of records) for (const node of record.addedNodes) if (node instanceof HTMLAnchorElement && node.href.startsWith('mailto:')) window.__testMailto = node.href; });
  observer.observe(document.body, { childList: true });
});
await page.locator('button[type="submit"]').click();
const mailto = new URL(await page.evaluate(() => window.__testMailto));
assert.equal(mailto.pathname, 'oi@serraresearch.org');
assert.match(mailto.searchParams.get('body'), /Pessoa de teste/);
assert.match(mailto.searchParams.get('body'), /pessoa@example.org/);
assert.match(mailto.searchParams.get('subject'), /Radar Legislativo & Análise de Risco Regulatório/);
assert.match(await page.locator('#form-status').innerText(), /Conclua o envio no seu aplicativo/);
await page.locator('#privacy-open').click();
assert.match(await page.locator('#dialog-title').innerText(), /Privacidade/);
assert.match(await page.locator('dialog').innerText(), /não utiliza cookies de rastreamento/);
const dialogAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
await page.keyboard.press('Escape');

const responsive = [];
for (const width of [320, 375, 390, 768, 901, 950, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
  const dimensions = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
  responsive.push(dimensions);
  assert.ok(dimensions.content <= dimensions.width, `Overflow at ${width}: ${dimensions.content}`);
assert.ok(await page.locator('.hero-lead').evaluate(el => parseFloat(getComputedStyle(el).fontSize)) >= 16, `Hero copy too small at ${width}`);
assert.ok(await page.locator('.service-card > p').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize)) >= 16, `Service copy too small at ${width}`);
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
await page.locator('.menu-toggle').click();
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
await page.getByRole('navigation').getByRole('link', { name: 'Metodologia' }).click();
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
assert.equal(new URL(page.url()).hash, '#metodologia');
await page.locator('.menu-toggle').click();
await page.keyboard.press('Escape');
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
const mobileAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
const simplify = result => result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
const report = { functional: 'passed', responsive, errors, failedRequests, accessibility: { desktop: simplify(desktopAxe), dialog: simplify(dialogAxe), mobile: simplify(mobileAxe) } };
await writeFile('test-results/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ functional: report.functional, responsive: report.responsive, errors, failedRequests, accessibility: report.accessibility }, null, 2));
assert.equal(errors.length, 0, 'JavaScript errors');
assert.equal(failedRequests.length, 0, 'Failed asset requests');
assert.equal(desktopAxe.violations.length + mobileAxe.violations.length + dialogAxe.violations.length, 0, 'Accessibility violations');

} finally {
  if (browser) await browser.close();
  server.kill();
}
