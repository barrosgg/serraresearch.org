import assert from 'node:assert/strict';
import {readFile,writeFile,unlink,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const fixturePaths=['src/content/publications/validation-fixture-pt.md','src/content/publications/validation-fixture-en.md','src/content/publications/validation-private-draft.md'];
for(const file of fixturePaths){try{await access(file);throw new Error(`Refusing to overwrite existing file ${file}`);}catch(error){if(error.code!=='ENOENT')throw error;}}
const build=()=>{const result=spawnSync(process.execPath,['node_modules/astro/astro.js','build'],{encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},maxBuffer:4*1024*1024});assert.equal(result.status,0,result.stdout+result.stderr);};
try{
 for(const [index,lang] of ['pt','en'].entries()){
  const source=await readFile(`src/content/publications/model-${lang}.md`,'utf8');
  await writeFile(fixturePaths[index],source.replace('editorial-template','validation-fixture').replace(/slug: (modelo|template)/,'slug: validation-publication').replace('draft: true','draft: false'));
 }
 const draft=(await readFile('src/content/publications/model-pt.md','utf8')).replace('editorial-template','private-validation-fixture').replace('slug: modelo','slug: validation-private-draft');await writeFile(fixturePaths[2],draft);
 build();
 for(const [folder,lang] of [['publicacoes','pt-BR'],['en/publications','en']]){
  const article=await readFile(`dist/${folder}/validation-publication/index.html`,'utf8');assert.match(article,/ScholarlyArticle/);assert.ok(article.includes(`lang="${lang}"`));assert.match(article,/index,follow/);assert.ok(article.includes(lang==='en'?'How to cite':'Como citar'));assert.match(article,/hreflang="en"/);assert.match(article,/hreflang="pt-BR"/);
  const landing=await readFile(`dist/${lang==='en'?'en/':''}index.html`,'utf8');assert.ok(landing.includes(`${folder}/validation-publication/`));
  const library=await readFile(`dist/${folder}/index.html`,'utf8');assert.ok(library.includes(`${folder}/validation-publication/`));
 }
 try{await access('dist/publicacoes/validation-private-draft/index.html');throw new Error('Private draft was published');}catch(error){if(error.code!=='ENOENT')throw error;}
 const sitemap=await readFile('dist/sitemap-0.xml','utf8');assert.ok(sitemap.includes('validation-publication/'));assert.ok(!sitemap.includes('validation-private-draft'));
 console.log('Content workflow passed: published entries, translations, metadata, listing and draft exclusion.');
}finally{
 for(const file of fixturePaths){try{await unlink(file);}catch(error){if(error.code!=='ENOENT')throw error;}}
 build();
}
