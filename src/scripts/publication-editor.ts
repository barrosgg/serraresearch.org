const form=document.querySelector<HTMLFormElement>('#publication-editor');
if(form){
 const output=document.querySelector<HTMLTextAreaElement>('#editor-markdown')!;
 const status=document.querySelector<HTMLElement>('#editor-status')!;
 const download=document.querySelector<HTMLButtonElement>('#download-publication')!;
 const submit=form.querySelector<HTMLButtonElement>('[type="submit"]')!;
 const en=form.dataset.language==='en';const msg=(pt:string,english:string)=>en?english:pt;
 let filename='';submit.disabled=false;
 const validResource=(url:string)=>/^https:\/\/[^\s]+$/.test(url)||/^\/publications\/[^\s]+$/.test(url);
 form.addEventListener('input',()=>{download.disabled=true;output.value='';status.textContent='';});
 form.addEventListener('change',()=>{download.disabled=true;output.value='';status.textContent='';});
 form.addEventListener('submit',event=>{
  event.preventDefault();download.disabled=true;output.value='';
  const data=new FormData(form);const get=(key:string)=>String(data.get(key)||'').trim();
  try{
   const required=['title','description','slug','translationKey','date','tags','authors','abstract','body'];
   if(required.some(key=>!get(key)))throw Error(msg('Preencha todos os campos obrigatórios.','Complete all required fields.'));
   const demo=data.has('demo');let slug=get('slug');if(demo&&!slug.startsWith('demo-'))slug='demo-'+slug;
   if(!demo&&slug.startsWith('demo-'))throw Error(msg('O prefixo demo- é reservado a exemplos fictícios.','The demo- prefix is reserved for fictional examples.'));
   if(['editor','modelo','template'].includes(slug))throw Error(msg('Este endereço é reservado. Escolha outro.','This address is reserved. Choose another.'));
   const authors=get('authors').split('\n').filter(line=>line.trim()).map(line=>{const [name,institution,orcid]=line.split('|').map(value=>value.trim());if(!name)throw Error(msg('Informe o nome de cada autor.','Enter each author’s name.'));if(orcid&&!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(orcid))throw Error(msg('ORCID inválido. Use 0000-0000-0000-0000.','Invalid ORCID. Use 0000-0000-0000-0000.'));return {name,affiliations:institution?[institution]:[],...(orcid?{orcid}:{})};});
   const metadata:Record<string,unknown>={title:get('title'),description:get('description'),language:get('language'),translationKey:get('translationKey'),slug,date:get('date'),type:get('type'),authors,tags:get('tags').split(',').map(tag=>tag.trim()).filter(Boolean),abstract:get('abstract'),draft:true,demo,featured:data.has('featured'),publicationStatus:get('publicationStatus'),reviewStatus:get('reviewStatus')};
   if(get('venue'))metadata.venue={name:get('venue'),kind:get('venueKind')};
   for(const key of ['doi','pdf','publicationUrl','version','reportNumber','conflicts','ethics','dataAvailability'])if(get(key))metadata[key]=get(key);
   if(get('doi')&&!/^10\.\d{4,9}\/\S+$/.test(get('doi')))throw Error(msg('Informe somente o identificador DOI, começando com 10.','Enter the DOI identifier only, starting with 10.'));
   if(get('pdf')&&!validResource(get('pdf')))throw Error(msg('Informe um link HTTPS ou caminho /publications/ para o PDF.','Enter an HTTPS link or /publications/ path for the PDF.'));
   if(get('publicationUrl')){const url=new URL(get('publicationUrl'));if(url.protocol!=='https:')throw Error(msg('O link original deve usar HTTPS.','The original link must use HTTPS.'));}
   if(get('license'))metadata.license={name:get('license')};
   if(get('funding'))metadata.funding=get('funding').split('\n').map(line=>line.trim()).filter(Boolean);
   if(get('resources'))metadata.resources=get('resources').split('\n').filter(line=>line.trim()).map(line=>{const [kind,label,url]=line.split('|').map(value=>value.trim());if(!['code','dataset','supplement','slides','video','project','preprint'].includes(kind)||!label||!url||!validResource(url))throw Error(msg('Confira tipo, título e URL de cada recurso.','Check the kind, title and URL of each resource.'));return {kind,label,url};});
   // JSON scalars, arrays and objects are valid YAML; serialization protects quotes and line breaks.
   output.value='---\n'+Object.entries(metadata).map(([key,value])=>key+': '+JSON.stringify(value)).join('\n')+'\n---\n\n'+(demo?msg('> Exemplo fictício para desenvolvimento. Não representa evidência científica.\n\n','> Fictional development example. Does not represent scientific evidence.\n\n'):'')+get('body')+'\n';
   filename=slug+'-'+get('language')+'.md';download.disabled=false;status.textContent=msg('Arquivo pronto para revisão. Baixe e revise antes de publicar.','File ready for review. Download and review before publishing.');
  }catch(error){status.textContent=error instanceof Error?error.message:msg('Confira os dados.','Check the data.');}
 });
 download.addEventListener('click',()=>{if(download.disabled||!output.value)return;const url=URL.createObjectURL(new Blob([output.value],{type:'text/markdown;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=filename;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
}
