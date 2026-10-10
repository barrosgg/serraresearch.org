import { defineCollection,z } from 'astro:content';
import { glob } from 'astro/loaders';
const https=z.string().url().refine(value=>value.startsWith('https://'),'Use an HTTPS URL');
const resourceUrl=z.string().refine(value=>/^\/publications\/[^\s]+$/.test(value)||/^https:\/\/[^\s]+$/.test(value),'Use a local /publications/ path or HTTPS URL');
const author=z.object({name:z.string().min(1),affiliations:z.array(z.string()).default([]),orcid:z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/,'Use a formatted ORCID identifier').optional(),url:https.optional()});
const publications=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/publications',generateId:({entry})=>entry.replace(/\.md$/,'') }),schema:z.object({
 title:z.string(),description:z.string().max(180),language:z.enum(['pt','en']),translationKey:z.string(),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
 date:z.coerce.date(),updated:z.coerce.date().optional(),authors:z.array(z.union([z.string().min(1),author]).transform(value=>author.parse(typeof value==='string'?{name:value}:value))).min(1),type:z.enum(['Whitepaper','Relatório','Research report','Nota técnica','Technical note','Artigo de conferência','Conference paper','Artigo de periódico','Journal article','Artigo de workshop','Workshop paper','Preprint']),
 tags:z.array(z.string()).default([]),abstract:z.string(),draft:z.boolean().default(true),demo:z.boolean().default(false),featured:z.boolean().default(false),pdf:resourceUrl.optional(),doi:z.string().regex(/^10\.\d{4,9}\/\S+$/,'Use a valid DOI identifier').optional(),
 venue:z.object({name:z.string().min(1),kind:z.enum(['conference','journal','workshop','series','institution']),url:https.optional(),volume:z.string().optional(),issue:z.string().optional(),pages:z.string().optional(),issn:z.string().regex(/^\d{4}-\d{3}[\dX]$/).optional()}).optional(),
 publicationStatus:z.enum(['working-paper','preprint','accepted','published']).optional(),reviewStatus:z.enum(['not-peer-reviewed','editorial-review','peer-reviewed']).optional(),
 version:z.string().optional(),reportNumber:z.string().optional(),publicationUrl:https.optional(),publisher:z.string().min(1).optional(),
 resources:z.array(z.object({label:z.string().min(1),kind:z.enum(['code','dataset','supplement','slides','video','project','preprint']),url:resourceUrl})).default([]),
 license:z.object({name:z.string().min(1),url:https.optional()}).optional(),funding:z.array(z.string()).default([]),conflicts:z.string().optional(),ethics:z.string().optional(),dataAvailability:z.string().optional(),related:z.array(z.string()).default([]),
})});
export const collections={publications};
