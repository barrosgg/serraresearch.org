import assert from 'node:assert/strict';
import {readFile,writeFile,unlink,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const fixturePaths=['src/content/publications/validation-fixture-pt.md','src/content/publications/validation-fixture-en.md','src/content/publications/validation-private-draft.md','src/content/publications/validation-related-pt.md','src/content/publications/validation-related-en.md'];
for(const file of fixturePaths){try{await access(file);throw new Error(`Refusing to overwrite existing file ${file}`);}catch(error){if(error.code!=='ENOENT')throw error;}}
const build=()=>{const result=spawnSync(process.execPath,['node_modules/astro/astro.js','build'],{encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},maxBuffer:4*1024*1024});assert.equal(result.status,0,result.stdout+result.stderr);};
try{
 for(const [index,lang] of ['pt','en'].entries()){
  const source=await readFile(`src/content/publications/model-${lang}.md`,'utf8');
  const extra=`\nvenue:\n  name: "Validation Conference"\n  kind: conference\n  url: https://example.invalid/conference\npublicationStatus: preprint\nreviewStatus: not-peer-reviewed\nversion: "1.0"\nreportNumber: "VALIDATION-01"\npublicationUrl: https://example.invalid/publication\npdf: https://example.invalid/paper.pdf\ndoi: "10.5555/validation-fixture"\nresources:\n  - kind: code\n    label: "Validation code"\n    url: https://example.invalid/code\nlicense:\n  name: "Validation license"\nfunding: ["Validation funder"]\nconflicts: "Validation disclosure"\nethics: "Validation ethics"\ndataAvailability: "Validation data availability"\nrelated: ["validation-related", "private-validation-fixture"]\n`;
  await writeFile(fixturePaths[index],source.replace('editorial-template','validation-fixture').replace(/slug: (modelo|template)/,'slug: validation-publication').replace(/authors:\n  - "[^"]+"/,'authors:\n  - name: "Validation Author"\n    affiliations: ["Validation Institution"]\n    url: https://example.invalid/author\n    orcid: "0000-0000-0000-0000"').replace('type: Whitepaper',`type: ${lang==='pt'?'Artigo de conferência':'Conference paper'}`).replace('draft: true','draft: false'+extra));
  await writeFile(fixturePaths[index+3],source.replace('editorial-template','validation-related').replace(/slug: (modelo|template)/,'slug: validation-related').replace('draft: true','draft: false\nvenue:\n  name: "Validation Journal"\n  kind: journal\n  volume: "2"\n  issue: "1"\n  pages: "10-20"\n  issn: "1234-567X"'));
 }
 const draft=(await readFile('src/content/publications/model-pt.md','utf8')).replace('editorial-template','private-validation-fixture').replace('slug: modelo','slug: validation-private-draft');await writeFile(fixturePaths[2],draft);
 build();
 for(const [folder,lang] of [['publicacoes','pt-BR'],['en/publications','en']]){
  const article=await readFile(`dist/${folder}/validation-publication/index.html`,'utf8');assert.match(article,/ScholarlyArticle/);assert.ok(article.includes(`lang="${lang}"`));assert.match(article,/index,follow/);assert.ok(article.includes(lang==='en'?'How to cite':'Como citar'));assert.match(article,/hreflang="en"/);assert.match(article,/hreflang="pt-BR"/);
  const landing=await readFile(`dist/${lang==='en'?'en/':''}index.html`,'utf8');assert.ok(landing.includes(`${folder}/validation-publication/`));
  const library=await readFile(`dist/${folder}/index.html`,'utf8');assert.ok(library.includes(`${folder}/validation-publication/`));
  assert.match(article,/name="citation_title"/);assert.match(article,/name="citation_conference_title" content="Validation Conference"/);assert.match(article,/name="citation_author" content="Validation Author"/);assert.match(article,/name="citation_doi" content="10.5555\/validation-fixture"/);assert.match(article,/name="citation_pdf_url" content="https:\/\/example.invalid\/paper.pdf"/);
  assert.match(article,/Validation Institution/);assert.match(article,/orcid.org\/0000-0000-0000-0000/);assert.match(article,/Validation code/);assert.match(article,/Validation disclosure/);assert.match(article,/download="validation-publication.bib"/);assert.match(article,/@inproceedings/);assert.ok(article.includes(`${folder}/validation-related/`));assert.ok(!article.includes('validation-private-draft/'));
  const json=JSON.parse(article.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);assert.equal(json.author[0].name,'Validation Author');assert.equal(json.author[0].affiliation[0].name,'Validation Institution');assert.equal(json.isPartOf.name,'Validation Conference');assert.equal(json.identifier.value,'10.5555/validation-fixture');assert.equal(json.publisher,undefined,'Do not invent the publisher of an external venue');
  const journal=await readFile(`dist/${folder}/validation-related/index.html`,'utf8');assert.match(journal,/name="citation_journal_title" content="Validation Journal"/);assert.match(journal,/name="citation_issn" content="1234-567X"/);assert.match(journal,/@article/);assert.ok(!journal.includes('id="resources"'),'Empty resources must be omitted');
  const template=await readFile(`dist/${folder}/${lang==='en'?'template':'modelo'}/index.html`,'utf8');assert.ok(!template.includes('name="citation_title"'));assert.match(template,/publication-editorial-guide/);assert.ok(!template.includes('download="modelo.bib"')&&!template.includes('download="template.bib"'));
 }
 try{await access('dist/publicacoes/validation-private-draft/index.html');throw new Error('Private draft was published');}catch(error){if(error.code!=='ENOENT')throw error;}
 const sitemap=await readFile('dist/sitemap-0.xml','utf8');assert.ok(sitemap.includes('validation-publication/'));assert.ok(!sitemap.includes('validation-private-draft'));
 console.log('Content workflow passed: published entries, translations, metadata, listing and draft exclusion.');
}finally{
 for(const file of fixturePaths){try{await unlink(file);}catch(error){if(error.code!=='ENOENT')throw error;}}
 build();
}
