# Serra Research

Site institucional em **Astro 5**, com landing page em português e inglês, navegação lateral, fontes locais, ajustes de acessibilidade e biblioteca de publicações. O conteúdo institucional é entregue em HTML estático; JavaScript é usado somente para menu móvel, detalhes, abas, preferências e preparação de e-mail.

## Desenvolvimento e validação

Requer Node.js 22.12+ (validado com 24.19.0) e npm.

```sh
cd /workspace/serraresearch.org
npm ci --no-audit --no-fund --cache /workspace/.npm-cache
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --port 5173
```

O caminho local é `/serraresearch.org/`, refletindo o subdiretório do GitHub Pages. `astro.config.mjs` define `site`, `base`, URLs e sitemap. O endereço publicado é **https://barrosgg.github.io/serraresearch.org/**; a versão inglesa fica em `/en/`.

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --port 4173
```

`build` executa a validação TypeScript/Astro e gera `dist/`. `npm test` valida a publicação de entradas bilíngues temporárias e a exclusão de rascunhos, restaura o build sem essas entradas e testa o site de produção, iniciando Astro Preview na porta 5174. Usa `/usr/bin/chromium`, o caminho definido em `CHROMIUM_PATH`, ou o Chromium gerenciado instalado com `npx playwright install chromium`. Valida serviços, abas por teclado, formulário, foco/menu móvel, páginas, traduções, links, SEO, ausência de cookies, preferências, HTML sem JavaScript, responsividade e acessibilidade automatizada com axe. Capturas e relatórios ficam em `test-results/`, ignorado pelo Git. Esses testes não substituem avaliação completa com leitores de tela e pessoas com deficiência.

No ambiente cloud, use o checkout existente: cada tarefa já é isolada e não precisa de worktree. Processos devem ser reiniciados ao restaurar o ambiente. `ASTRO_TELEMETRY_DISABLED=1` evita telemetria da ferramenta e a necessidade de gravar configurações em um diretório de usuário indisponível; não muda o site.

## Conteúdo e organização

- `src/lib/landing.ts`: conteúdo institucional e diagramas renderizados no servidor.
- `src/lib/service-research.ts`: dossiês bilíngues das quatro áreas, tecnologias, licenças e fontes de dados.
- `src/components/ServiceDetails.astro`: templates estáticos dos modais; os detalhes são inseridos no diálogo ao abrir cada área.
- `src/i18n/`: equivalentes de conteúdo em inglês e rótulos de navegação.
- `src/lib/site.ts`: contato, dados da empresa, caminhos e links bilíngues.
- `src/components/`: landing, lateral, footer, ferramentas de leitura, biblioteca e layout de artigo.
- `src/layouts/Base.astro`: HTML, SEO, compartilhamento e dados estruturados.
- `src/lib/legal.ts`: políticas e declaração de acessibilidade nos dois idiomas.
- `src/content/publications/`: publicações Markdown validadas por Astro Content Collections.
- `src/content.config.ts`: esquema editorial obrigatório e estado de rascunho.
- `public/social-preview.png`: imagem para compartilhamento.

Astro é o framework do site, não um painel de administração. As **Content Collections** fornecem o fluxo editorial por arquivos e Git. Nenhum CMS externo, conta editorial, banco de dados ou credencial adicional é necessário. Um painel pode ser integrado posteriormente sem substituir os templates.

Cada modal de atuação reúne stack aberta/proprietária, dados secundários, coleta primária possível, plataformas e indicadores de impacto. As ferramentas são opções de arquitetura, e não uma declaração de uso em todos os projetos. A pesquisa e seus limites estão registrados em [docs/service-research.md](docs/service-research.md). Ao atualizar os dossiês, revise traduções, licenças, disponibilidade das fontes e condições de divulgação; mantenha todos esses detalhes dentro do modal.

## Publicar uma pesquisa ou whitepaper

1. Copie `templates/publicacao.pt.md` para `src/content/publications/nome-da-pesquisa.pt.md`. Para inglês, use `templates/publication.en.md`.
2. Substitua os textos demonstrativos por conteúdo revisado. Preencha título, descrição (máximo 180 caracteres), idioma (`pt` ou `en`), slug exclusivo no idioma, data, autores, tipo, temas e resumo. Use a mesma `translationKey` nas traduções.
3. Use `##` para as seções que entram automaticamente no sumário. Adicione métodos, fontes, resultados, limitações e referências. Imagens precisam de descrição alternativa; gráficos com dados precisam de fonte, unidades e equivalente textual ou tabela acessível.
4. Se existir PDF real, coloque-o em `public/publications/` e configure `pdf: /publications/arquivo.pdf`. Verifique sua acessibilidade. `doi` é opcional e deve conter um identificador real, como `10.xxxx/xxxxx`.
5. Mantenha `draft: true` durante a revisão. Rascunhos comuns não geram páginas públicas nem aparecem na biblioteca ou na landing page. Defina `draft: false` para publicar.
6. Execute build e testes; faça commit e push para `main`. O workflow publica somente após os testes passarem. A entrada aparece automaticamente na landing e na biblioteca do idioma, com seu próprio permalink, sumário, resumo e citação.

Os modelos especiais `model-pt.md` e `model-en.md` têm `translationKey: editorial-template` e são exibidos explicitamente como exemplos em `/publicacoes/modelo/` e `/en/publications/template/`. Continuam em rascunho, têm `noindex` e são excluídos do sitemap. Não apresentam resultados ou métricas fictícias. Para uma publicação real, use outra `translationKey` e slugs que não sejam `modelo` ou `template`.

Quando não houver tradução de uma pesquisa, o seletor de idioma leva à biblioteca do outro idioma; não declara essa biblioteca como tradução no `hreflang`.

## Privacidade, acessibilidade e contato

O site não instala analytics, pixels, cookies de publicidade nem incorpora mapas de terceiros. Um aviso informativo explica a operação atual. `localStorage` guarda apenas ajustes de leitura (`serra-accessibility`) e a dispensa do aviso (`serra-privacy-notice`). O visitante pode apagar essas preferências no rodapé; não são enviadas à empresa. Se serviços opcionais forem integrados, será necessário implementar bloqueio anterior ao consentimento e escolhas equivalentes de aceitar/rejeitar antes de ativá-los.

O formulário **prepara um e-mail** para `oi@serraresearch.org`; o visitante conclui o envio no próprio aplicativo. O site não recebe, transmite ao backend nem salva seus campos. Há validação e uma alternativa para copiar a mensagem. Sem JavaScript, o contato direto por e-mail continua disponível. Envio direto exigirá serviço de backend e atualização da política.

Os dados da empresa foram fornecidos pelo responsável pelo projeto. O CNPJ `00.000.000/0000-00` foi solicitado como placeholder, está identificado como provisório e foi omitido dos dados estruturados. Substitua-o por um registro confirmado em `src/lib/site.ts` e atualize a política antes de representar cadastro definitivo.

## Hospedagem e mudanças de domínio

`.github/workflows/deploy-pages.yml` usa Node 24, instala dependências pelo lockfile, gera o site, testa com Chromium e publica `dist/` no GitHub Pages a cada push para `main`. A origem de Pages deve ser **GitHub Actions**.

Para domínio próprio, atualize `site`, `base`, `origin` e o mapeamento de URLs do sitemap em `astro.config.mjs` e `src/lib/site.ts`; depois configure DNS/Pages e verifique canonicals, robots, alternates e assets. Não há domínio próprio configurado nesta alteração. HTTPS é fornecido pelo Pages; controle de cabeçalhos HTTP depende da hospedagem.
