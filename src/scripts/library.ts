interface ResearchRecord {id:string;title:string;abstract:string;authors:string;tags:string[];topic:string;year:string;type:string;date:string;doi:string;venue:string;report:string;featured:boolean;}
const dataNode=document.querySelector('#research-library-data');
if(dataNode){
 const {lang,entries}=JSON.parse(dataNode.textContent!) as {lang:'pt'|'en';entries:ResearchRecord[]};
 const t=(pt:string,en:string)=>lang==='pt'?pt:en;
 const search=document.querySelector<HTMLInputElement>('#publication-search')!;
 const year=document.querySelector<HTMLSelectElement>('#publication-year')!;
 const type=document.querySelector<HTMLSelectElement>('#publication-type')!;
 const sort=document.querySelector<HTMLSelectElement>('#publication-sort')!;
 const result=document.querySelector('#publication-result-status')!;
 const container=document.querySelector('#publication-results')!;
 const empty=document.querySelector<HTMLElement>('#publication-empty-state')!;
 const reset=document.querySelector<HTMLButtonElement>('#reset-publication-filters')!;
 const topics=[...document.querySelectorAll<HTMLButtonElement>('[data-topic]')];
 const cards=new Map([...container.querySelectorAll<HTMLElement>('[data-record]')].map(card=>[card.dataset.record!,card]));
 const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(lang).trim();
 let topic='';let timer:ReturnType<typeof setTimeout>;
 [search,year,type,sort,...topics].forEach(control=>control.disabled=false);
 function update(writeUrl=true){
  const words=normalize(search.value).split(/\s+/).filter(Boolean);
  const matches=entries.filter(entry=>{
   const text=normalize([entry.title,entry.abstract,entry.authors,...entry.tags,entry.doi,entry.venue,entry.report].join(' '));
   return words.every(word=>text.includes(word))&&(!topic||entry.topic===topic)&&(!year.value||entry.year===year.value)&&(!type.value||entry.type===type.value);
  }).sort((a,b)=>sort.value==='title'?a.title.localeCompare(b.title,lang):sort.value==='oldest'?a.date.localeCompare(b.date):Number(b.featured)-Number(a.featured)||b.date.localeCompare(a.date));
  const ids=new Set(matches.map(entry=>entry.id));cards.forEach((card,id)=>card.hidden=!ids.has(id));matches.forEach(entry=>container.append(cards.get(entry.id)!));
  result.textContent=`${matches.length} ${t('publicações encontradas','publications found')}`;empty.hidden=matches.length>0;
  topics.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.topic===topic)));
  reset.disabled=!(search.value||topic||year.value||type.value||sort.value!=='recent');
  if(writeUrl){const url=new URL(location.href);for(const [key,value] of [['q',search.value.trim()],['topic',topic],['year',year.value],['type',type.value],['sort',sort.value==='recent'?'':sort.value]]){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);}history.replaceState(null,'',url);}
 }
 function readUrl(){const params=new URL(location.href).searchParams;search.value=params.get('q')||'';topic=topics.some(b=>b.dataset.topic===params.get('topic'))?params.get('topic')||'':'';for(const [select,key] of [[year,'year'],[type,'type'],[sort,'sort']] as const){const value=params.get(key);select.value=value&&[...select.options].some(option=>option.value===value)?value:key==='sort'?'recent':'';}update(false);}
 function clear(){clearTimeout(timer);search.value='';topic='';year.value='';type.value='';sort.value='recent';update();search.focus({preventScroll:true});}
 search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>update(),150);});
 [year,type,sort].forEach(select=>select.addEventListener('change',()=>update()));topics.forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.topic||'';update();}));
 reset.addEventListener('click',clear);document.querySelector('#reset-empty-search')!.addEventListener('click',clear);window.addEventListener('popstate',readUrl);
 document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus();search.select();}});
 readUrl();
}
