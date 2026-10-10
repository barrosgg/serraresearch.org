import {getCollection} from 'astro:content';
import type {Locale} from '../i18n';
export async function publicationPaths(lang:Locale){
 const entries=await getCollection('publications');
 const slugs=new Set<string>();const translations=new Set<string>();
 for(const {data:d} of entries){
  const slug=`${d.language}/${d.slug}`;const translation=`${d.language}/${d.translationKey}`;
  if(slugs.has(slug)||translations.has(translation))throw new Error(`Duplicate publication slug or translation key: ${slug}`);
  if(['modelo','template'].includes(d.slug)&&d.translationKey!=='editorial-template')throw new Error(`Reserved template slug: ${d.slug}`);
  slugs.add(slug);translations.add(translation);
 }
 return entries.filter(entry=>entry.data.language===lang&&(!entry.data.draft||entry.data.translationKey==='editorial-template')).map(entry=>({params:{slug:entry.data.slug},props:{entry,translation:entries.find(other=>other.data.translationKey===entry.data.translationKey&&other.data.language!==lang&&(!other.data.draft||other.data.translationKey==='editorial-template'))}}));
}
