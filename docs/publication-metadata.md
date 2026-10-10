# Modelo de publicação: comparação e campos

Referência: [SPARC — IBM Research](https://research.ibm.com/publications/sparc-separating-perception-and-reasoning-circuits-for-test-time-scaling-of-vlms). Comparação feita em 10/10/2026 com o texto da página fornecido pelo usuário. O acesso direto ao domínio retornou HTTP 403 no proxy; os destinos efetivos dos links e o HTML/metatags da IBM não foram inspecionados. Não foram reutilizados o estudo, os autores ou seus resultados como conteúdo da Serra Research.

## O que a referência apresenta

O texto fornecido apresenta título, tipo **Conference paper**, evento **ICML 2026**, data **06 Jul 2026**, abstract, lista de autores, indicação de afiliação IBM na época da publicação, temas, recursos **Download** e **Publication**, compartilhamento, pesquisas relacionadas e caminho **Home → Publications**.

| Elemento | Modelo anterior da Serra | Ajuste realizado |
| --- | --- | --- |
| Título, abstract, data, autores, temas | Já disponíveis | Preservados, com autores estruturados e datas sem ambiguidade de fuso. |
| Tipo de publicação | Whitepaper, relatório, nota técnica | Acrescentados artigo de conferência, periódico, workshop e preprint. |
| Publicação / evento | Sem campo estruturado | `venue`: nome, tipo, URL, volume, número, páginas e ISSN opcionais. |
| Afiliação na época | Nomes de autores em texto | Autores podem informar instituições, perfil e ORCID. A página identifica o momento da afiliação. |
| Download e publicação original | PDF opcional | PDF preservado; `publicationUrl` e recursos categorizados complementam os materiais. |
| Compartilhamento | Copiar link | Preservado. |
| Caminho de navegação | Link para biblioteca | Breadcrumbs Início → Publicações → título. |
| Pesquisas relacionadas | Sem seção | Até três entradas públicas do mesmo idioma, priorizando `related`, depois temas compartilhados. Rascunhos são excluídos. |

## Melhorias adicionais

Os itens abaixo foram acrescentados para documentação científica; **não foram identificados no texto da IBM enviado**:

- `publicationStatus` separado de `reviewStatus`. Publicar no site não afirma revisão por pares.
- Versão, número do relatório e editora/instituição responsável. Veículos externos não recebem automaticamente Serra Research como editora.
- Licença, financiamento, conflitos de interesse, ética e disponibilidade dos dados.
- Código, datasets, suplementos, slides, vídeos, preprint e página de projeto.
- Citação textual e download BibTeX, construídos dos campos informados.
- Metatags `citation_*` e JSON-LD ScholarlyArticle para entradas publicadas. Isso prepara a identificação por ferramentas acadêmicas; não garante indexação.

Os campos opcionais são omitidos quando não preenchidos. O template demonstra a estrutura em uma ficha editorial explicativa, sem inventar DOI, eventos, instituições, revisão ou materiais. Ele continua `draft: true`, com `noindex`, fora do sitemap e sem metadados acadêmicos de publicação real.

## Preencher uma pesquisa real

O frontmatter dos quatro arquivos de template contém a referência completa dos campos opcionais. Autores simples continuam aceitos. Para dados completos, substitua a lista por objetos:

```yaml
# Exemplo de estrutura — substitua por dados reais antes de publicar.
authors:
  - name: "Nome do autor"
    affiliations:
      - "Instituição na época da publicação"
    # orcid: "Identificador confirmado no formato 0000-0000-0000-0000"
    # url: "https://pagina-real-do-autor"
```

`venue.kind` aceita `conference`, `journal`, `workshop`, `series` e `institution`. Recursos possuem `label`, `kind` e `url`. URLs externas exigem HTTPS; arquivos de pesquisa locais devem ficar em `/publications/`. `related` contém as `translationKey` das publicações relacionadas, e não suas URLs.

Antes de mudar `draft` para `false`, revise metadados, autoria, arquivos, licença, afirmações de revisão e as duas traduções. Use títulos `##` para as seções do sumário. Os testes validam publicação, descoberta, metadados estruturados e exclusão de rascunhos.

## Acervo de desenvolvimento

`demo: true` é uma classificação explícita para exemplos fictícios autorizados para desenvolvimento. Requer slug `demo-…`, tem aviso público e noindex, é excluído do sitemap e não emite ScholarlyArticle nem citation_*; a citação e o BibTeX também avisam que se trata de demonstração. Não use métricas científicas, DOI, autores reais ou downloads inventados. O exemplo destacado usa séries sintéticas cujos valores estão documentados no próprio artigo.

`featured: true` controla o card destacado. Busca e filtros são inteiramente locais. O editor PT/EN exporta metadados e Markdown como rascunho; nenhum dado digitado é persistido. Campos opcionais não expostos no editor permanecem disponíveis no template e no schema Astro.
