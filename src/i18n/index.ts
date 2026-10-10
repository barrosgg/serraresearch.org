import { en } from './en';
export type Locale = 'pt' | 'en';
const ordered = Object.entries(en).sort(([a],[b])=>b.length-a.length);
/** Single replacement pass prevents translated words being translated again. */
const pattern = new RegExp(ordered.map(([key])=>key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
export function localize(value:string,lang:Locale) {return lang==='en'?value.replace(pattern,match=>en[match]):value;}
export function pick(lang:Locale,pt:string,en:string){return lang==='pt'?pt:en;}
export const navLabels = {pt:['Atuação','Dados e pesquisa','Projetos','Metodologia','Publicações','Contato'],en:['Expertise','Data & research','Projects','Approach','Publications','Contact']};
