import { arrow,icon,renderFlowMarkup } from '../lib/visuals';
const en=document.body.dataset.lang==='en';
const t=(pt:string,english:string)=>en?english:pt;
const storage={get(key:string){try{return localStorage.getItem(key);}catch{return null;}},set(key:string,value:string){try{localStorage.setItem(key,value);return true;}catch{return false;}},remove(key:string){try{localStorage.removeItem(key);}catch{}}};
type Preferences={size:number;contrast:boolean;motion:boolean};
const defaults:Preferences={size:100,contrast:false,motion:false};
let prefs={...defaults};
try{const saved=JSON.parse(storage.get('serra-accessibility')||'null');if(saved){prefs={size:[100,110,120,130].includes(saved.size)?saved.size:100,contrast:saved.contrast===true,motion:saved.motion===true};}}catch{}
const size=document.querySelector<HTMLInputElement>('#text-size')!;
const contrast=document.querySelector<HTMLInputElement>('#high-contrast')!;
const motion=document.querySelector<HTMLInputElement>('#reduce-motion')!;
function applyPreferences(save=false){
 document.documentElement.style.setProperty('--text-scale',String(prefs.size/100));
 document.documentElement.classList.toggle('high-contrast',prefs.contrast);
 document.documentElement.classList.toggle('reduce-motion',prefs.motion);
 size.value=String(prefs.size);contrast.checked=prefs.contrast;motion.checked=prefs.motion;
 document.querySelector('#text-size-value')!.textContent=`${prefs.size}%`;
 if(save&&!storage.set('serra-accessibility',JSON.stringify(prefs))) document.querySelector('.settings-status')!.textContent=t('As preferências valem nesta página; este navegador não permite salvá-las.','Preferences apply to this page; this browser does not allow saving them.');
}
applyPreferences();
[size,contrast,motion].forEach(el=>el.addEventListener('input',()=>{prefs={size:Number(size.value),contrast:contrast.checked,motion:motion.checked};applyPreferences(true);}));
document.querySelector('#reset-preferences')!.addEventListener('click',()=>{prefs={...defaults};storage.remove('serra-accessibility');applyPreferences();});
const notice=document.querySelector<HTMLElement>('#privacy-notice')!;
notice.hidden=storage.get('serra-privacy-notice')==='v1';
document.querySelector('#dismiss-notice')!.addEventListener('click',()=>{notice.hidden=true;storage.set('serra-privacy-notice','v1');});
document.querySelector('#clear-local-data')!.addEventListener('click',()=>{storage.remove('serra-accessibility');storage.remove('serra-privacy-notice');prefs={...defaults};applyPreferences();document.querySelector('#privacy-status')!.textContent=t('Preferências apagadas deste navegador.','Preferences deleted from this browser.');notice.hidden=false;});

const sidebar=document.querySelector<HTMLElement>('#sidebar')!;
const menu=document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const backdrop=document.querySelector<HTMLButtonElement>('.menu-backdrop')!;
const mainContent=document.querySelector<HTMLElement>('.site-content')!;
const mobileHeader=document.querySelector<HTMLElement>('.mobile-header')!;
function closeMenu(restore=false){const wasOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('Abrir menu','Open menu'));sidebar.classList.remove('is-open');backdrop.hidden=true;document.body.classList.remove('menu-open');mainContent.inert=false;mobileHeader.inert=false;if(wasOpen&&restore)menu.focus();}
menu.addEventListener('click',()=>{if(menu.getAttribute('aria-expanded')==='true'){closeMenu(true);return;}menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label',t('Fechar menu','Close menu'));sidebar.classList.add('is-open');backdrop.hidden=false;document.body.classList.add('menu-open');mainContent.inert=true;mobileHeader.inert=true;sidebar.querySelector<HTMLAnchorElement>('a')!.focus();});
backdrop.addEventListener('click',()=>closeMenu(true));
document.querySelector('[data-menu-close]')!.addEventListener('click',()=>closeMenu(true));
sidebar.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',e=>{
 if(menu.getAttribute('aria-expanded')!=='true')return;
 if(e.key==='Escape'){e.preventDefault();closeMenu(true);}
 if(e.key==='Tab'){const elements=Array.from(sidebar.querySelectorAll<HTMLElement>('a,button'));const first=elements[0],last=elements.at(-1)!;if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
});
window.matchMedia('(min-width: 1101px)').addEventListener('change',()=>closeMenu());
let dialogOpener:HTMLElement|null=null;
document.querySelectorAll<HTMLButtonElement>('[data-open]').forEach(button=>button.addEventListener('click',()=>{dialogOpener=button;const id=button.dataset.open!;closeMenu();document.querySelector<HTMLDialogElement>(`#${id}`)!.showModal();document.body.classList.add('dialog-open');}));
document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog=>{
 dialog.querySelector('[data-close],.dialog-close')?.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(dialogOpener?.isConnected){if(innerWidth<=1100&&dialogOpener.closest('.sidebar'))menu.focus();else dialogOpener.focus();}});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
});
// Keep keyboard focus at the destination of in-page navigation.
document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach(a=>a.addEventListener('click',()=>{const url=new URL(a.href);if(url.pathname!==location.pathname||!url.hash)return;const target=document.getElementById(url.hash.slice(1));if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}));
const nav=document.querySelector('#navigation')!;
const sections=Array.from(document.querySelectorAll<HTMLElement>('section[id]:not(#inicio),#dados'));
let frame=false;
function updateNav(){let active='';for(const section of sections)if(section.getBoundingClientRect().top<=Math.min(innerHeight*.28,200))active=section.id;nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===`#${active}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
window.addEventListener('scroll',()=>{if(frame)return;frame=true;requestAnimationFrame(()=>{updateNav();frame=false;});},{passive:true});window.addEventListener('resize',updateNav);updateNav();

const configElement=document.querySelector('#landing-data');
if(configElement){
 const config=JSON.parse(configElement.textContent!) as {services:{name:string;code:string;icon:string;full:string;items:string[]}[];flows:Parameters<typeof renderFlowMarkup>[0][]};
 document.querySelectorAll<HTMLButtonElement>('[data-service],[data-flow]').forEach(button=>button.disabled=false);
 const interest=document.querySelector<HTMLSelectElement>('select[name="interest"]')!;
 const detail=document.querySelector<HTMLDialogElement>('#detail-dialog')!;
 document.querySelectorAll<HTMLButtonElement>('[data-service]').forEach(button=>button.addEventListener('click',()=>{
  const s=config.services[Number(button.dataset.service)];dialogOpener=button;
  document.querySelector('#dialog-content')!.innerHTML=`<span class="eyebrow">${s.code} / ${t('ÁREA DE ATUAÇÃO','EXPERTISE')}</span><span class="dialog-icon">${icon(s.icon)}</span><h2 id="dialog-title">${s.name}</h2><p>${s.full}</p><h3>${t('Como podemos apoiar','How we can help')}</h3><ul>${s.items.map(item=>`<li>${icon('check')}<span>${item}</span></li>`).join('')}</ul><a id="dialog-contact" class="button" href="#contato">${t('Converse sobre seu projeto','Discuss your project')} ${arrow}</a>`;
  detail.showModal();document.body.classList.add('dialog-open');
  document.querySelector('#dialog-contact')!.addEventListener('click',()=>{interest.value=s.name;detail.close();document.querySelector<HTMLElement>('#contato')!.focus({preventScroll:true});});
 }));
 document.querySelectorAll<HTMLAnchorElement>('[data-interest]').forEach(a=>a.addEventListener('click',()=>{interest.value=a.dataset.interest!;}));
 const tabs=Array.from(document.querySelectorAll<HTMLButtonElement>('[data-flow]'));
 const render=(index:number)=>{tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});const panel=document.querySelector('#flow-content')!;panel.setAttribute('aria-labelledby',tabs[index].id);panel.innerHTML=renderFlowMarkup(config.flows[index]);};
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>render(i));tab.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();render(next);tabs[next].focus();});});
 const form=document.querySelector<HTMLFormElement>('#contact-form')!;
 const name=form.querySelector<HTMLInputElement>('[name="name"]')!;
 const message=form.querySelector<HTMLTextAreaElement>('[name="message"]')!;
 name.addEventListener('input',()=>name.setCustomValidity(name.value.trim()?'':t('Informe seu nome.','Enter your name.')));
 message.addEventListener('input',()=>message.setCustomValidity(message.value.trim().length>=10?'':t('Descreva seu projeto com pelo menos 10 caracteres.','Describe your project in at least 10 characters.')));
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);
  const body=`${t('Olá, equipe Serra Research!','Hello, Serra Research team!')}\n\n${t('Nome','Name')}: ${String(data.get('name')).trim()}\n${t('E-mail','Email')}: ${data.get('email')}\n${t('Organização','Organization')}: ${String(data.get('organization')).trim()||t('Não informada','Not specified')}\n${t('Área de interesse','Area of interest')}: ${data.get('interest')||t('A definir','To be defined')}\n\n${t('Sobre o projeto','About the project')}:\n${String(data.get('message')).trim()}\n`;
  const subject=`${t('Novo projeto','New project')} — ${data.get('interest')||'Serra Research'}`;
  const prepared=`${t('Para','To')}: oi@serraresearch.org\n${t('Assunto','Subject')}: ${subject}\n\n${body}`;
  const status=document.querySelector('#form-status')!;status.textContent=t('Mensagem preparada. Conclua o envio no seu aplicativo de e-mail. Se ele não abriu, copie a mensagem abaixo.','Message prepared. Complete sending in your email application. If it did not open, copy the message below.');
  if(!document.querySelector('#copy-message')){const button=document.createElement('button');button.type='button';button.id='copy-message';button.className='text-link';button.textContent=t('Copiar mensagem →','Copy message →');status.after(button);}
  const mail=document.createElement('a');mail.href=`mailto:oi@serraresearch.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;mail.target='_blank';mail.rel='noopener';document.body.append(mail);mail.click();mail.remove();
  document.querySelector<HTMLButtonElement>('#copy-message')!.onclick=async()=>{try{await navigator.clipboard.writeText(prepared);status.textContent=t('Mensagem copiada. Cole no seu e-mail e envie para oi@serraresearch.org.','Message copied. Paste into your email and send to oi@serraresearch.org.');}catch{status.textContent=t('Copie o texto abaixo para o seu e-mail.','Copy the text below into your email.');let fallback=document.querySelector<HTMLTextAreaElement>('#message-fallback');if(!fallback){fallback=document.createElement('textarea');fallback.id='message-fallback';fallback.readOnly=true;fallback.setAttribute('aria-label',t('Mensagem preparada para copiar','Prepared message to copy'));status.after(fallback);}fallback.value=prepared;fallback.focus();fallback.select();}};
 });
 // The form requires an email application; without JavaScript the direct email link remains available.
 form.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled=false;
}
const share=document.querySelector('#share-publication');
share?.addEventListener('click',async()=>{const status=document.querySelector('#share-status')!;try{await navigator.clipboard.writeText(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href);status.textContent=t('Link copiado.','Link copied.');}catch{status.textContent=t('Copie o endereço na barra do navegador.','Copy the address from your browser’s address bar.');}});
