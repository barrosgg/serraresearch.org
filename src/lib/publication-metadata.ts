import type {CollectionEntry} from 'astro:content';
import {origin} from './site';
export type PublicationData=CollectionEntry<'publications'>['data'];
export const resourceHref=(url:string)=>url.startsWith('/')?`${import.meta.env.BASE_URL.replace(/\/$/,'')}${url}`:url;
export function publicationMetadata(d:PublicationData,canonical:string){
 const citation=`${d.authors.map(a=>a.name).join('; ')}. ${d.title}. ${d.venue?.name||d.publisher||'Serra Research'}, ${d.date.getUTCFullYear()}${d.version?`, v. ${d.version}`:''}. ${d.doi?`https://doi.org/${d.doi}`:canonical}`;
 const authorSchema=d.authors.map(a=>({'@type':'Person',name:a.name,...(a.url&&{url:a.url}),...('orcid' in a&&a.orcid&&{sameAs:`https://orcid.org/${a.orcid}`}),...(a.affiliations.length&&{affiliation:a.affiliations.map(name=>({'@type':'Organization',name}))})}));
 const publisher=d.publisher||(!d.venue?'Serra Research':undefined);
 const structured={'@type':'ScholarlyArticle',headline:d.title,description:d.description,abstract:d.abstract,datePublished:d.date.toISOString(),dateModified:(d.updated||d.date).toISOString(),inLanguage:d.language==='pt'?'pt-BR':'en',author:authorSchema,...(publisher&&{publisher:{'@type':'Organization',name:publisher}}),url:canonical,genre:d.type,keywords:d.tags.join(', '),...(d.doi&&{identifier:{'@type':'PropertyValue',propertyID:'DOI',value:d.doi}}),...(d.venue&&{isPartOf:{'@type':d.venue.kind==='journal'?'Periodical':'CreativeWork',name:d.venue.name,...(d.venue.url&&{url:d.venue.url}),...(d.venue.issn&&{issn:d.venue.issn})}}),...(d.license?.url&&{license:d.license.url}),...(d.version&&{version:d.version}),...(d.pdf&&{encoding:{'@type':'MediaObject',encodingFormat:'application/pdf',contentUrl:new URL(resourceHref(d.pdf),origin).href}})};
 const citations=[{name:'citation_title',content:d.title},...d.authors.map(a=>({name:'citation_author',content:a.name})),{name:'citation_publication_date',content:d.date.toISOString().slice(0,10).replaceAll('-','/')},{name:'citation_language',content:d.language}];
 if(d.doi)citations.push({name:'citation_doi',content:d.doi});
 if(d.pdf)citations.push({name:'citation_pdf_url',content:new URL(resourceHref(d.pdf),origin).href});
 if(d.venue){const field=d.venue.kind==='journal'?'citation_journal_title':(['conference','workshop'].includes(d.venue.kind)?'citation_conference_title':null);if(field)citations.push({name:field,content:d.venue.name});for(const [key,fieldName] of [['volume','citation_volume'],['issue','citation_issue'],['issn','citation_issn']] as const)if(d.venue[key])citations.push({name:fieldName,content:d.venue[key]!});}
 if(d.reportNumber)citations.push({name:'citation_technical_report_number',content:d.reportNumber});
 const escape=(value:string)=>value.replaceAll('\\','\\textbackslash{}').replace(/[{}%&#_$]/g,char=>`\\${char}`).replace(/[\r\n]+/g,' ');
 const bibType=d.venue?.kind==='journal'?'article':d.venue&&['conference','workshop'].includes(d.venue.kind)?'inproceedings':d.type==='Preprint'?'misc':'techreport';
 const bibFields:[string,string][]=[['title',d.title],['author',d.authors.map(a=>a.name).join(' and ')],['year',String(d.date.getUTCFullYear())],['url',d.publicationUrl||canonical]];
 if(d.venue?.kind==='journal')bibFields.push(['journal',d.venue.name]);else if(d.venue&&['conference','workshop'].includes(d.venue.kind))bibFields.push(['booktitle',d.venue.name]);else if(bibType==='techreport')bibFields.push(['institution',d.publisher||(d.venue?.kind==='institution'?d.venue.name:'Serra Research')]);
 if(d.publisher&&bibType!=='techreport')bibFields.push(['publisher',d.publisher]);
 if(d.doi)bibFields.push(['doi',d.doi]);if(d.version)bibFields.push(['note',`Version ${d.version}`]);if(d.reportNumber&&bibType!=='article')bibFields.push(['number',d.reportNumber]);
 for(const field of ['volume','pages'] as const)if(d.venue?.[field])bibFields.push([field,d.venue[field]!]);if(d.venue?.issue)bibFields.push(['number',d.venue.issue]);
 const bibtex=`@${bibType}{serra-${d.slug}-${d.date.getUTCFullYear()},\n${bibFields.map(([key,value])=>`  ${key} = {${escape(value)}}`).join(',\n')}\n}\n`;
 return {citation,structured,citations,bibtex};
}
