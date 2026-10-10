import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// Check reference destinations against rendered pages, not just the inventory.
export async function auditModels(page, baseURL) {
  await page.setViewportSize({width:1440,height:1000});
  const audit = JSON.parse(await readFile(new URL('../src/data/model-audit.json', import.meta.url), 'utf8'));
  const routes = {'':'en/', 'design-system/':'en/design-system/', 'publicacoes/':'en/publications/', 'publicacoes/modelo/':'en/publications/template/', 'publicacoes/editor/':'en/publications/editor/'};
  const report = { sourceDocuments:audit.files.length, uniqueHtmlModels:audit.uniqueHtmlFiles, coverage:[], colors:[], assets:[] };
  for (const lang of ['pt','en']) {
    const groups = Map.groupBy(audit.patterns, row => lang==='pt'?row.route:routes[row.route]);
    for (const [route, rows] of groups) {
      await page.goto(baseURL+route, {waitUntil:'networkidle'});
      for (const row of rows) {
        let selector = row.selector || 'main';
        if (lang==='en') selector=selector.replace('SONDA Z-04','PROBE Z-04').replace('EXUTÓRIO Q50','OUTLET Q50');
        assert.ok(await page.locator(selector).count()>0, `${lang}: missing ${row.heading} at ${route} ${selector}`);
        report.coverage.push({lang,route,heading:row.heading,status:row.status,selector,result:'passed'});
      }
      const color = await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--orange').trim().toLowerCase());
      assert.equal(color,'#fd5638');
      const buttons=await page.locator('.button:not(.button-blue):not(.button-outline):not(:disabled)').evaluateAll(nodes=>nodes.filter(el=>el.getBoundingClientRect().width>0).map(el=>({label:el.textContent.trim(),background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color,size:parseFloat(getComputedStyle(el).fontSize),weight:Number(getComputedStyle(el).fontWeight),arrows:Array.from(el.querySelectorAll('svg path')).map(path=>getComputedStyle(path).stroke)})));
      for (const button of buttons) {assert.equal(button.background,'rgb(253, 86, 56)',`${route}: ${button.label}`);assert.equal(button.color,'rgb(255, 255, 255)');assert.ok(button.size>=14&&button.size<=15&&button.weight===600,`${route}: compact brand action typography`);assert.ok(button.arrows.every(stroke=>stroke==='rgb(255, 255, 255)'));report.colors.push({lang,route,...button,result:'passed'});}
      const action=page.locator('.sidebar-bottom > .button').first();
      assert.ok(await action.locator('.sidebar-action-label').evaluate(el=>el.getBoundingClientRect().height<=parseFloat(getComputedStyle(el).lineHeight)+1),'Sidebar action label must fit on one line');
      assert.equal((await action.boundingBox()).height,44,'Sidebar action should stay compact');
      for(const state of ['hover','focus']) {
        if(state==='hover')await action.hover();else {await page.mouse.move(0,0);await action.focus();}
        const style=await action.evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));
        assert.equal(style.background,'rgb(253, 86, 56)',`${route}: ${state}`);assert.equal(style.color,'rgb(255, 255, 255)');
      }
      if(route===''||route==='en/') {
        for(const selector of ['.section-heading','.service-card:nth-child(2)','.connection-grid','.contact-grid']) {
          const lines=await page.locator(selector).evaluateAll(nodes=>nodes.map(el=>getComputedStyle(el,'::after').content));
          assert.ok(lines.every(content=>content==='none'),'Landing dividers must not repeat across headings and panels');
        }
        const markers=await page.locator('.section-heading .eyebrow').evaluateAll(nodes=>nodes.map(el=>({color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor,size:parseFloat(getComputedStyle(el).fontSize),weight:Number(getComputedStyle(el).fontWeight)})));
        assert.ok(markers.length>0,'Landing section markers must be present');
        for(const marker of markers){assert.equal(marker.color,'rgb(253, 86, 56)');assert.equal(marker.background,'rgba(0, 0, 0, 0)');assert.ok(marker.size>=19&&marker.weight>=700);}
      }
      if(route.includes('design-system')) {
        const returnButton=await page.locator('.sidebar-return').evaluate(el=>{const s=getComputedStyle(el);return {background:s.backgroundColor,color:s.color,size:parseFloat(s.fontSize),weight:Number(s.fontWeight),arrow:getComputedStyle(el.querySelector('path')).stroke};});
        assert.equal(returnButton.background,'rgb(253, 86, 56)');assert.equal(returnButton.color,'rgb(255, 255, 255)');assert.equal(returnButton.arrow,'rgb(255, 255, 255)');
        assert.ok(returnButton.size===14&&returnButton.weight===600,'Sidebar return action should use compact typography');
        assert.equal(await page.locator('.ds-architecture-badge').count(),5);
        const pipelineIcons=await page.locator('.ds-pipeline-icon svg').evaluateAll(nodes=>nodes.map(el=>getComputedStyle(el).color));
        assert.equal(pipelineIcons.length,5);assert.ok(pipelineIcons.every(color=>color==='rgb(253, 86, 56)'));
        report.colors.push({lang,route,pipelineIcons,result:'passed'});
        assert.equal(await page.locator('.ds-spectrum-card').count(),4);
        const borders=await page.locator('.ds-spectrum-card').evaluateAll(nodes=>nodes.map(el=>getComputedStyle(el).borderTopColor));
        assert.deepEqual(borders,['rgb(16, 185, 129)','rgb(0, 114, 178)','rgb(253, 86, 56)','rgb(99, 102, 241)']);
        const connectors=await page.locator('.ds-architecture li:nth-child(n+2)').evaluateAll(nodes=>nodes.map(el=>getComputedStyle(el,'::before').backgroundColor));
        assert.ok(connectors.every(color=>color==='rgb(253, 86, 56)'));
        const fills=await page.locator('#dataviz > .ds-dataviz-grid > .ds-chart:nth-child(3) polyline, .ds-radar-svg polygon:last-of-type').evaluateAll(nodes=>nodes.map(el=>getComputedStyle(el).stroke));
        assert.ok(fills.every(fill=>fill==='rgb(253, 86, 56)'));
        report.colors.push({lang,route,chartCoral:fills,result:'passed'});
        for (const link of await page.locator('main a[download]').all()) {
          const href=await link.getAttribute('href');
          const url=new URL(href,baseURL); if(url.origin!==new URL(baseURL).origin)continue;
          const response=await fetch(url);assert.equal(response.ok,true,`Missing download ${url}`);
          const bytes=Buffer.from(await response.arrayBuffer());assert.ok(bytes.length>0);
          if(url.pathname.endsWith('.svg')) {
            const errors=await page.evaluate(xml=>{const d=new DOMParser().parseFromString(xml,'image/svg+xml');return d.querySelectorAll('parsererror').length;},bytes.toString());assert.equal(errors,0,`Invalid SVG ${url}`);
            if(url.pathname.includes('/illustrations/')) {
              const clipped=await page.evaluate(xml=>{
                const svg=new DOMParser().parseFromString(xml,'image/svg+xml').documentElement;
                svg.style.cssText='position:fixed;visibility:hidden;left:0;top:0';document.body.append(svg);
                const errors=[];
                for(const text of svg.querySelectorAll('text')) {
                  const y=Number(text.getAttribute('y')),box=text.getBBox();
                  for(const rect of svg.querySelectorAll('rect[rx]')) {
                    const x=Number(rect.getAttribute('x')),top=Number(rect.getAttribute('y')),width=Number(rect.getAttribute('width')),height=Number(rect.getAttribute('height'));
                    if(y>top&&y<top+height&&(box.x<x||box.x+box.width>x+width))errors.push(text.textContent);
                  }
                }
                svg.remove();return errors;
              },bytes.toString());
              assert.deepEqual(clipped,[],`Clipped SVG labels ${url}`);
            }
          }
          if(url.pathname.endsWith('.pdf'))assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
          report.assets.push({lang,url:url.pathname,bytes:bytes.length,result:'passed'});
        }
      }
    }
  }
  await writeFile('test-results/model-audit.json',JSON.stringify(report,null,2)+'\n');
  return {references:audit.patterns.length,destinationChecks:report.coverage.length,colorChecks:report.colors.length,downloadChecks:report.assets.length};
}
