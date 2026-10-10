const map=document.querySelector<HTMLElement>('.ds-map-panel');
if(map){
 const en=document.documentElement.lang==='en';const status=map.querySelector<HTMLElement>('#ds-map-status')!;
 const layers=[...map.querySelectorAll<HTMLButtonElement>('[data-map-layer]')];
 const zoom=[...map.querySelectorAll<HTMLButtonElement>('[data-map-zoom]')];
 const features=map.querySelector<SVGGElement>('#ds-map-features')!;
 let level=1;
 [...layers,...zoom].forEach(button=>button.disabled=false);
 const update=()=>{zoom.find(b=>b.dataset.mapZoom==='out')!.disabled=level<=1;zoom.find(b=>b.dataset.mapZoom==='in')!.disabled=level>=2.5;status.textContent=(en?'Visible layers: ':'Camadas visíveis: ')+layers.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.textContent!.trim()).join(', ')+` · zoom ${level.toFixed(2)}×`;};
 layers.forEach(button=>button.addEventListener('click',()=>{const active=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(active));map.querySelector<SVGGElement>(`[data-map-feature="${button.dataset.mapLayer}"]`)!.style.display=active?'':'none';update();}));
 zoom.forEach(button=>button.addEventListener('click',()=>{level=Math.min(2.5,Math.max(1,level+(button.dataset.mapZoom==='in'?.25:-.25)));features.setAttribute('transform',`translate(450 180) scale(${level}) translate(-450 -180)`);update();}));
 zoom.find(b=>b.dataset.mapZoom==='out')!.disabled=true;
}
