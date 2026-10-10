import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const output = 'test-results';
await mkdir(output, { recursive: true });
const server = spawn(process.execPath, ['node_modules/astro/astro.js', 'preview', '--host', '127.0.0.1', '--port', '5174', '--strictPort'], { stdio: 'pipe', env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'} });
let serverLog = '';
server.stdout.on('data', data => { serverLog += data; });
server.stderr.on('data', data => { serverLog += data; });
let browser;
try {
let ready = false;
for (let attempt = 0; attempt < 60; attempt++) {
  if (server.exitCode !== null) throw new Error(`Test server failed: ${serverLog}`);
  try { const response = await fetch('http://127.0.0.1:5174/serraresearch.org/'); if (response.ok) { ready = true; break; } } catch {}
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
await page.goto('http://127.0.0.1:5174/serraresearch.org/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
assert.match(await page.locator('h1').innerText(), /Inteligência e ciência de dados para impacto social/);
assert.equal(await page.locator('.service-card').count(), 4);
assert.match(await page.locator('#dados').innerText(), /baseline com lideranças/);
assert.match(await page.locator('#dados').innerText(), /Lei de Acesso à Informação/);
await page.locator('.term-guide summary').click();
assert.equal(await page.locator('.term-guide').evaluate(el => el.open), true);
assert.match(await page.locator('.term-guide').innerText(), /semelhança de significado/);
await page.locator('.term-guide summary').click();
await page.locator('#navigation').getByRole('link', { name: 'Dados e pesquisa' }).click();
assert.equal(new URL(page.url()).hash, '#dados');
await page.waitForFunction(() => document.querySelector('nav a[href="#dados"]')?.getAttribute('aria-current') === 'location');
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
await page.keyboard.press('Tab');
await page.locator('.skip-link').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('main').evaluate(el=>el===document.activeElement),true);
const desktopAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

for (let i = 0; i < 4; i++) {
  await page.locator(`[data-service="${i}"]`).click();
  await page.locator('#detail-dialog').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#detail-dialog li').count(), 3);
  if (i === 1) {
    await page.locator('#dialog-contact').click();
    assert.equal(await page.locator('select[name="interest"]').inputValue(), 'Preparação de dados e servidores MCP');
  } else {
    await page.keyboard.press('Escape');
  }
  assert.equal(await page.locator('#detail-dialog').isVisible(), false);
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
await page.locator('[data-open="privacy-dialog"]').click();
assert.match(await page.locator('#privacy-dialog').innerText(), /Não usamos cookies de publicidade/);
const dialogAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
await page.keyboard.press('Escape');
await page.locator('[data-open="accessibility-dialog"]').first().click();
await page.locator('#text-size').fill('130');
await page.locator('#high-contrast').check();
await page.locator('#reduce-motion').check();
await page.keyboard.press('Escape');
await page.reload({waitUntil:'networkidle'});
assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--text-scale').trim()),'1.3');
assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
const contrastAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
await page.locator('[data-open="privacy-dialog"]').click();
await page.locator('#clear-local-data').click();
assert.equal(await page.evaluate(()=>localStorage.getItem('serra-accessibility')),null);
assert.equal(await page.evaluate(()=>localStorage.getItem('serra-privacy-notice')),null);
await page.keyboard.press('Escape');
await page.locator('#dismiss-notice').click();

const responsive = [];
for (const width of [320, 375, 390, 768, 901, 950, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://127.0.0.1:5174/serraresearch.org/', { waitUntil: 'networkidle' });
  const dimensions = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
  responsive.push(dimensions);
  assert.ok(dimensions.content <= dimensions.width, `Overflow at ${width}: ${dimensions.content}`);
assert.ok(await page.locator('.hero-lead').evaluate(el => parseFloat(getComputedStyle(el).fontSize)) >= 16, `Hero copy too small at ${width}`);
assert.ok(await page.locator('.service-card > p').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize)) >= 16, `Service copy too small at ${width}`);
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:5174/serraresearch.org/', { waitUntil: 'networkidle' });
await page.locator('.menu-toggle').click();
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
await page.locator('#navigation').getByRole('link', { name: 'Metodologia' }).click();
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
assert.equal(new URL(page.url()).hash, '#metodologia');
await page.waitForFunction(() => document.querySelector('nav a[href="#metodologia"]')?.getAttribute('aria-current') === 'location');
await page.locator('.menu-toggle').click();
await page.keyboard.press('Escape');
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
assert.equal(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement),true);
await page.locator('.menu-toggle').click();await page.locator('[data-menu-close]').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
const mobileAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
const pageAxe=[];
const routeNames=['en/','privacidade/','cookies/','acessibilidade/','publicacoes/','publicacoes/modelo/','en/privacy/','en/cookies/','en/accessibility/','en/publications/','en/publications/template/'];
for(const route of routeNames){
 await page.setViewportSize({width:1440,height:1000});
 const response=await page.goto(`http://127.0.0.1:5174/serraresearch.org/${route}`,{waitUntil:'networkidle'});
 assert.equal(response.status(),200);
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('main footer').count(),0,'Footer must be outside main');
 const lang=route.startsWith('en/')?'en':'pt-BR';assert.equal(await page.locator('html').getAttribute('lang'),lang);
 assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://barrosgg.github.io/serraresearch.org/${route}`);
 const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')));
 for(const href of new Set(links)){
  if(href.startsWith('#')){assert.ok(await page.locator(`[id="${href.slice(1)}"]`).count(),`Missing anchor ${href} on ${route}`);}
  else if(href.startsWith('/serraresearch.org/')){const target=new URL(href,'http://127.0.0.1:5174');const result=await fetch(target);assert.equal(result.status,200,`Broken link ${href}`);}
 }
 if(route.includes('modelo')||route.includes('template'))assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,follow');
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();pageAxe.push({route,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 for(const width of [320,390]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${route} at ${width}`);}
}
await page.goto('http://127.0.0.1:5174/serraresearch.org/en/',{waitUntil:'networkidle'});
await page.setViewportSize({width:1440,height:1000});
assert.match(await page.locator('h1').innerText(),/Intelligence and data science for social impact/);
await page.locator('[data-service="1"]').click();assert.match(await page.locator('#detail-dialog').innerText(),/vector databases/);await page.keyboard.press('Escape');
const cookieJar=await context.cookies();assert.equal(cookieJar.length,0,'No application cookies');
assert.ok(!(await page.evaluate(()=>Object.keys(localStorage))).some(key=>/name|email|message/.test(key)),'No form persistence');
const sitemap=await (await fetch('http://127.0.0.1:5174/serraresearch.org/sitemap-0.xml')).text();assert.ok(!sitemap.includes('/modelo/')&&!sitemap.includes('/template/'));
assert.match(sitemap,/serraresearch.org\/en\//);
const robots=await (await fetch('http://127.0.0.1:5174/serraresearch.org/robots.txt')).text();assert.match(robots,/Sitemap: https:\/\/barrosgg.github.io/);
const smooth=await browser.newContext({reducedMotion:'no-preference'});const smoothPage=await smooth.newPage();await smoothPage.goto('http://127.0.0.1:5174/serraresearch.org/');assert.equal(await smoothPage.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'smooth');await smooth.close();
const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const staticPage=await noJs.newPage();await staticPage.goto('http://127.0.0.1:5174/serraresearch.org/');assert.match(await staticPage.locator('h1').innerText(),/impacto social/);assert.equal(await staticPage.locator('#navigation').isVisible(),true);assert.equal(await staticPage.locator('#flow-content h3').count(),1);await noJs.close();
await page.setViewportSize({width:320,height:844});await page.goto('http://127.0.0.1:5174/serraresearch.org/',{waitUntil:'networkidle'});await page.locator('.menu-toggle').click();await page.locator('[data-open="accessibility-dialog"]').first().click();await page.locator('#text-size').fill('130');await page.keyboard.press('Escape');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow at 130% text, 320px');
await page.setViewportSize({width:1440,height:1000});await page.locator('[data-open="accessibility-dialog"]').first().click();await page.locator('#reset-preferences').click();await page.keyboard.press('Escape');
await page.screenshot({path:'test-results/desktop-hero.png'});await page.goto('http://127.0.0.1:5174/serraresearch.org/publicacoes/modelo/',{waitUntil:'networkidle'});await page.screenshot({path:'test-results/whitepaper.png',fullPage:true});
const simplify = result => result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
const report = { functional: 'passed', responsive, errors, failedRequests, accessibility: { desktop: simplify(desktopAxe), dialog: simplify(dialogAxe), mobile: simplify(mobileAxe), contrast:simplify(contrastAxe), pages:pageAxe } };
await writeFile('test-results/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ functional: report.functional, responsive: report.responsive, errors, failedRequests, accessibility: report.accessibility }, null, 2));
assert.equal(errors.length, 0, 'JavaScript errors');
assert.equal(failedRequests.length, 0, 'Failed asset requests');
assert.equal(desktopAxe.violations.length + mobileAxe.violations.length + dialogAxe.violations.length + contrastAxe.violations.length + pageAxe.reduce((total,p)=>total+p.violations.length,0), 0, 'Accessibility violations');

} finally {
  if (browser) await browser.close();
  server.kill();
}
