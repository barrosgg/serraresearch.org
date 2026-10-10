import { defineCollection,z } from 'astro:content';
import { glob } from 'astro/loaders';
const publications=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/publications',generateId:({entry})=>entry.replace(/\.md$/,'') }),schema:z.object({
 title:z.string(),description:z.string().max(180),language:z.enum(['pt','en']),translationKey:z.string(),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
 date:z.coerce.date(),updated:z.coerce.date().optional(),authors:z.array(z.string()).min(1),type:z.enum(['Whitepaper','Relatório','Research report','Nota técnica','Technical note']),
 tags:z.array(z.string()).default([]),abstract:z.string(),draft:z.boolean().default(true),pdf:z.string().refine(value=>value.startsWith('/publications/')||/^https:\/\//.test(value),'PDF must be a local /publications/ path or HTTPS URL').optional(),doi:z.string().regex(/^10\.\d{4,9}\/\S+$/,'Use a valid DOI identifier').optional(),
})});
export const collections={publications};
