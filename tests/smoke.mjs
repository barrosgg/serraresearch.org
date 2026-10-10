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

const serviceDialogAxe=[];
assert.equal(await page.locator('.hero-actions .button-blue').innerText(),'Nosso método');
assert.equal(await page.locator('.hero-actions .button-blue').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(0, 87, 255)');
assert.equal(await page.locator('.hero-actions .button').first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 137, 107)');
for (let i = 0; i < 4; i++) {
  await page.locator(`[data-service="${i}"]`).click();
  await page.locator('#detail-dialog').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#detail-dialog .service-support-list li').count(), 3);
  assert.equal(await page.locator('#detail-dialog .service-detail-section').count(),5);
  for(const id of ['service-stack-title','service-secondary-title','service-primary-title','service-platforms-title','service-impact-title'])assert.equal(await page.locator(`#detail-dialog #${id}`).isVisible(),true);
  assert.equal(await page.locator('#detail-dialog .stack-group').count(),2);
  assert.ok(await page.locator('#detail-dialog .source-tags a').count()>=8);
  assert.ok(await page.locator('#detail-dialog .service-detail-list li').count()>=10);
  assert.ok((await page.locator('#detail-dialog').boundingBox()).width>=900,'Service dialog should be wider on desktop');
  await page.locator('#detail-dialog .service-references summary').click();
  assert.equal(await page.locator('#detail-dialog .service-references').evaluate(el=>el.open),true);
  const links=await page.locator('#detail-dialog a[target="_blank"]').evaluateAll(nodes=>nodes.map(a=>({href:a.href,rel:a.rel})));
  assert.ok(links.length>=10);assert.ok(links.every(a=>a.href.startsWith('https://')&&a.rel.includes('noopener')));
  const accessibility=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();serviceDialogAxe.push({service:i,violations:accessibility.violations});
  if(i===1)await page.screenshot({path:'test-results/service-modal-desktop.png'});

  if (i === 1) {
    await page.locator('#dialog-contact').click();
    assert.equal(await page.locator('select[name="interest"]').inputValue(), 'Preparação de dados e servidores MCP');
    assert.equal(await page.locator('#contato').evaluate(el=>el===document.activeElement),true);
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
for(const width of [320,390]){
 await page.setViewportSize({width,height:844});
 for(let i=0;i<4;i++){
  await page.locator(`[data-service="${i}"]`).click();
  const r=await page.locator('#detail-dialog').boundingBox();assert.ok(r.x>=0&&r.x+r.width<=width);
  assert.ok(await page.locator('#dialog-content').evaluate(el=>el.scrollWidth<=el.clientWidth),`Dialog overflow for ${i} at ${width}`);
  await page.locator('#dialog-content').evaluate(el=>el.scrollTop=el.scrollHeight);assert.equal(await page.locator('#dialog-contact').isVisible(),true);
  if(width===390&&i===3)await page.screenshot({path:'test-results/service-modal-mobile.png'});
  await page.keyboard.press('Escape');assert.equal(await page.locator(`[data-service="${i}"]`).evaluate(el=>el===document.activeElement),true);
 }
}
const mobileAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
const pageAxe=[];
const routeNames=['en/','privacidade/','cookies/','acessibilidade/','publicacoes/','publicacoes/modelo/','en/privacy/','en/cookies/','en/accessibility/','en/publications/','en/publications/template/','design-system/','en/design-system/','publicacoes/editor/','en/publications/editor/','publicacoes/demo-educacao/','en/publications/demo-educacao/'];
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
 if(route.includes('demo-')){assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,follow');assert.equal(await page.locator('meta[name="citation_title"]').count(),0);assert.ok(!(await page.content()).includes('ScholarlyArticle'));}
 if(route.includes('modelo')||route.includes('template')){
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,follow');assert.equal(await page.locator('.publication-breadcrumbs li').count(),3);assert.equal(await page.locator('.publication-editorial-guide dt').count(),6);assert.equal(await page.locator('meta[name="citation_title"]').count(),0);
  await page.locator('a[href="#publication-details"]').click();assert.equal(new URL(page.url()).hash,'#publication-details');
 }
 if(route.includes('design-system')){
  assert.equal(await page.locator('.ds-toc a').count(),17);assert.equal(await page.locator('.ds-section').count(),17);
  assert.equal(await page.locator('.sidebar-docs #navigation a').count(),17);assert.equal(await page.locator('.ds-illustration-stage img').count(),5);assert.equal(await page.locator('.ds-chart').count(),4);assert.equal(await page.locator('.ds-stationery .wordmark').count(),3);
  const tokens=await (await fetch('http://127.0.0.1:5174/serraresearch.org/design-tokens.json')).json();
  for(const [key,variable] of [['actionOrange','--action-orange'],['buttonInk','--button-ink'],['dataBlue','--data-blue'],['muted','--muted'],['charcoal','--charcoal']])assert.equal(await page.evaluate(v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim(),variable),tokens.colors[key]);
  assert.match(await page.locator('#cores').innerText(),/4\.5:1|4,5:1/);
  assert.equal(await page.locator('#ds-invalid').getAttribute('aria-describedby'),'ds-email-error');
  await page.locator('.ds-disclosure summary').click();assert.equal(await page.locator('.ds-disclosure').evaluate(el=>el.open),true);
  const logoStyles=await page.locator('.sidebar-brand').evaluate(el=>({name:el.textContent.trim(),serra:getComputedStyle(el).fontWeight,research:getComputedStyle(el.querySelector('span')).fontWeight,dot:getComputedStyle(el.querySelector('i')).backgroundColor}));assert.deepEqual(logoStyles,{name:'Serra Research',serra:'600',research:'400',dot:'rgb(253, 86, 56)'});
  await page.locator('#navigation a[href="#cartografia"]').click();assert.equal(new URL(page.url()).hash,'#cartografia');
  const layer=page.locator('[data-map-layer="parcels"]');await layer.click();assert.equal(await layer.getAttribute('aria-pressed'),'false');assert.equal(await page.locator('[data-map-feature="parcels"]').isVisible(),false);await layer.focus();await page.keyboard.press('Enter');assert.equal(await layer.getAttribute('aria-pressed'),'true');
  await page.locator('[data-map-zoom="in"]').click();assert.match(await page.locator('#ds-map-features').getAttribute('transform'),/scale\(1.25\)/);await page.locator('[data-map-zoom="out"]').click();assert.equal(await page.locator('[data-map-zoom="out"]').isDisabled(),true);
  for(const summary of await page.locator('.ds-data-details summary').all())await summary.click();
  const google=await(await fetch('http://127.0.0.1:5174/serraresearch.org/design/google-maps-style.json')).json();assert.ok(Array.isArray(google)&&google.every(row=>Array.isArray(row.stylers)));
  const maplibre=await(await fetch('http://127.0.0.1:5174/serraresearch.org/design/maplibre-style.json')).json();assert.equal(maplibre.version,8);assert.equal(maplibre.sources.territories.data.features[0].properties.demo,true);assert.ok(maplibre.layers.every(layer=>layer.type==='background'||maplibre.sources[layer.source]));
  const csv=await(await fetch('http://127.0.0.1:5174/serraresearch.org/design/synthetic-data.csv')).text();assert.match(csv,/Synthetic design examples/);assert.match(csv,/"temporal","1","illustrative","62","58","66"/);
  assert.equal(await page.locator('.ds-print-detail').count(),7);assert.equal(await page.locator('.ds-print-toc a').count(),7);
  await page.locator('.ds-print-toc a[href="#print-cartoes"]').click();await page.waitForFunction(()=>Math.abs(document.querySelector('#print-cartoes').getBoundingClientRect().top)<250);await page.waitForTimeout(100);
  assert.equal(await page.locator('#navigation a[aria-current="location"]').getAttribute('href'),'#papelaria');
  await page.emulateMedia({reducedMotion:'no-preference'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'smooth');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
  const pdf=Buffer.from(await(await fetch('http://127.0.0.1:5174/serraresearch.org/design/print/letterhead.pdf')).arrayBuffer());assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
  const kit=Buffer.from(await(await fetch('http://127.0.0.1:5174/serraresearch.org/design/print/serra-stationery-kit.zip')).arrayBuffer());assert.equal(kit.readUInt32LE(0),0x04034b50);assert.ok(kit.length>1000);
  await page.locator('.ds-document-end a').click();assert.equal(new URL(page.url()).hash,'#design-top');assert.equal(await page.evaluate(()=>document.activeElement.id),'design-top');
  await page.screenshot({path:`test-results/design-system-${lang}.png`,fullPage:true});
 }
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();pageAxe.push({route,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 for(const width of [320,390]){
  await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${route} at ${width}`);
  if(route.includes('design-system'))assert.ok(await page.evaluate(()=>document.querySelector('.ds-toc').getBoundingClientRect().top>=document.querySelector('.ds-hero').getBoundingClientRect().bottom),'Design system contents must follow the hero without overlapping it');
 }
 if(route.includes('design-system')||route.includes('publications')||route.includes('publicacoes')){
  await page.evaluate(()=>document.documentElement.style.setProperty('--text-scale','1.3'));await page.setViewportSize({width:320,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Text overflow at 130% on ${route}`);
  await page.screenshot({path:`test-results/design-system-mobile-${lang}.png`});
  await page.evaluate(()=>{document.documentElement.style.removeProperty('--text-scale');document.documentElement.classList.add('high-contrast');});await page.setViewportSize({width:1440,height:1000});
  const highContrast=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();pageAxe.push({route:`${route} high contrast`,violations:highContrast.violations});
 }
}
await page.goto('http://127.0.0.1:5174/serraresearch.org/en/',{waitUntil:'networkidle'});
await page.setViewportSize({width:1440,height:1000});
assert.match(await page.locator('h1').innerText(),/Intelligence and data science for social impact/);
await page.locator('[data-service="1"]').click();assert.match(await page.locator('#detail-dialog').innerText(),/vector databases/);assert.match(await page.locator('#detail-dialog').innerText(),/PRIMARY DATA/);assert.match(await page.locator('#detail-dialog').innerText(),/Proprietary \/ non-open-source services/);await page.keyboard.press('Escape');
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

await page.goto('http://127.0.0.1:5174/serraresearch.org/publicacoes/',{waitUntil:'networkidle'});
await page.setViewportSize({width:1440,height:1000});
assert.equal(await page.locator('.research-record').count(),6);assert.equal(await page.locator('.research-demo-label').count(),6);
await page.screenshot({path:'test-results/research-library-desktop.png',fullPage:true});
const visible=()=>page.locator('.research-record:visible');
await page.locator('#publication-search').fill('permanencia');await page.waitForTimeout(200);assert.equal(await visible().count(),1);
assert.equal(new URL(page.url()).searchParams.get('q'),'permanencia');await page.reload();assert.equal(await visible().count(),1);
await page.locator('#reset-publication-filters').click();assert.equal(await visible().count(),6);
await page.locator('[data-topic="Território e ambiente"]').click();assert.equal(await visible().count(),2);
await page.locator('#publication-year').selectOption('2025');assert.equal(await visible().count(),1);
await page.locator('#publication-type').selectOption('Nota técnica');assert.equal(await visible().count(),0);assert.equal(await page.locator('#publication-empty-state').isVisible(),true);
await page.locator('#reset-empty-search').click();assert.equal(await visible().count(),6);
await page.locator('#publication-sort').selectOption('oldest');assert.match(await visible().first().innerText(),/2024/);
await page.locator('#reset-publication-filters').click();await page.keyboard.press('Control+k');assert.equal(await page.locator('#publication-search').evaluate(el=>el===document.activeElement),true);
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/research-library-mobile.png',fullPage:true});
await page.goto('http://127.0.0.1:5174/serraresearch.org/publicacoes/editor/',{waitUntil:'networkidle'});
const values={title:'Pesquisa "segura": <script>alert(1)</script>',description:'Descrição de teste com acentos.',slug:'validacao-editor',translationKey:'validacao-editor',date:'2026-10-10',tags:'Educação, Dados abertos',authors:'Autora Teste | Instituição Teste | 0000-0000-0000-0000',abstract:'Resumo com duas linhas.\nSem publicação automática.',body:'## Metodologia\n\nTexto de teste com <script>alert(1)</script>.',venue:'Série de teste',doi:'10.5555/editor',pdf:'/publications/example.pdf',publicationUrl:'https://example.invalid/paper',resources:'dataset | Dados | https://example.invalid/data'};
for(const [name,value] of Object.entries(values))await page.locator(`#publication-editor [name="${name}"]`).fill(value);
await page.locator('#publication-editor [name="demo"]').check();await page.locator('#publication-editor [type="submit"]').click();
assert.equal(await page.locator('#download-publication').isEnabled(),true);
const markdown=await page.locator('#editor-markdown').inputValue();const frontmatter=Object.fromEntries(markdown.split('---')[1].trim().split('\n').map(line=>{const index=line.indexOf(':');return[line.slice(0,index),JSON.parse(line.slice(index+1))];}));
assert.equal(frontmatter.title,values.title);assert.equal(frontmatter.slug,'demo-validacao-editor');assert.equal(frontmatter.draft,true);assert.equal(frontmatter.demo,true);assert.equal(frontmatter.authors[0].affiliations[0],'Instituição Teste');assert.equal(frontmatter.resources[0].kind,'dataset');assert.equal(frontmatter.abstract,values.abstract);assert.equal(await page.locator('#conteudo script:not([src])').count(),0,'User text must never render as HTML');
const downloadEvent=page.waitForEvent('download');await page.locator('#download-publication').click();const downloaded=await downloadEvent;assert.equal(downloaded.suggestedFilename(),'demo-validacao-editor-pt.md');
const downloadedText=await (await import('node:fs/promises')).readFile(await downloaded.path(),'utf8');assert.equal(downloadedText,markdown);
await page.locator('#publication-editor [name="doi"]').fill('fake-doi');assert.equal(await page.locator('#download-publication').isDisabled(),true);await page.locator('#publication-editor [type="submit"]').click();assert.match(await page.locator('#editor-status').innerText(),/DOI/);assert.equal(await page.locator('#editor-markdown').inputValue(),'');
await page.locator('#publication-editor [name="doi"]').fill('');await page.locator('#publication-editor [name="pdf"]').fill('javascript:alert(1)');await page.locator('#publication-editor [type="submit"]').click();assert.equal(await page.locator('#download-publication').isDisabled(),true);assert.match(await page.locator('#editor-status').innerText(),/HTTPS/);
assert.ok(!(await page.evaluate(()=>Object.values(localStorage).join(' '))).includes('Autora Teste'),'Editor must not persist author information');
assert.ok(!sitemap.includes('/demo-')&&!sitemap.includes('/editor/'));
const libraryNoJs=await browser.newContext({javaScriptEnabled:false});const plain=await libraryNoJs.newPage();await plain.goto('http://127.0.0.1:5174/serraresearch.org/publicacoes/');assert.equal(await plain.locator('.research-record:visible').count(),6);assert.equal(await plain.locator('#publication-search').isDisabled(),true);await libraryNoJs.close();

const simplify = result => result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
const report = { functional: 'passed', responsive, errors, failedRequests, accessibility: { desktop: simplify(desktopAxe), dialog: simplify(dialogAxe), mobile: simplify(mobileAxe), contrast:simplify(contrastAxe), pages:pageAxe, services:serviceDialogAxe.map(r=>({service:r.service,violations:simplify({violations:r.violations})})) } };
await writeFile('test-results/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ functional: report.functional, responsive: report.responsive, errors, failedRequests, accessibility: report.accessibility }, null, 2));
assert.equal(errors.length, 0, 'JavaScript errors');
assert.equal(failedRequests.length, 0, 'Failed asset requests');
assert.equal(desktopAxe.violations.length + mobileAxe.violations.length + dialogAxe.violations.length + contrastAxe.violations.length + pageAxe.reduce((total,p)=>total+p.violations.length,0) + serviceDialogAxe.reduce((total,p)=>total+p.violations.length,0), 0, 'Accessibility violations');

} finally {
  if (browser) await browser.close();
  server.kill();
}
