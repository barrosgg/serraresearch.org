# Serra Research

Site institucional responsivo baseado no design system **Serra Precision Research** fornecido para o projeto. A página apresenta atuação, frentes de projetos, metodologia e contato em português brasileiro.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+ e npm. O ambiente foi validado com Node.js 24.19.0.

```sh
cd /workspace/serraresearch.org
npm ci
npm run dev -- --port 5173 --strictPort
```

O projeto usa Vite, TypeScript e CSS responsivo, sem framework de interface. As fontes Space Grotesk e JetBrains Mono são instaladas via npm e servidas localmente. Não são necessários segredos, banco de dados ou serviços externos para executar o site.

## Build e validação

```sh
npm run build
npm test
```

O build gera o site estático em `dist/`. Para verificar esse resultado localmente:

```sh
npm run preview -- --port 4173 --strictPort
```

O teste inicia seu próprio servidor na porta 5174 e utiliza Chromium com Playwright. Verifica os quatro detalhes de serviços, seleção de interesse, navegação por teclado nas abas, validação do formulário, destinatário e conteúdo do e-mail, menu móvel, ausência de erros JavaScript e carregamento de recursos, layouts de 320 a 1440 pixels e verificações automatizadas de acessibilidade com axe. Relatórios e capturas são gerados em `test-results/`, que não é versionado.

No ambiente cloud, o teste usa `/usr/bin/chromium`. Em outra máquina, configure `CHROMIUM_PATH` com o caminho de um Chromium instalado ou execute `npx playwright install chromium` para instalar o navegador gerenciado pelo Playwright.

## Conteúdo e contato

- `src/main.ts`: conteúdo institucional, estrutura da página e interações.
- `src/style.css`: identidade visual, layouts, estados de foco e adaptações responsivas.
- `public/favicon.svg`: ícone da marca.
- `tests/smoke.mjs`: validação funcional e automatizada de acessibilidade.

O contato usa **oi@serraresearch.org**. O formulário prepara uma mensagem via `mailto:` e abre o aplicativo de e-mail do visitante. O envio precisa ser concluído nesse aplicativo. Há uma opção de copiar a mensagem caso não exista um aplicativo configurado. O site não recebe nem armazena os dados do formulário.

As imagens de dados são diagramas conceituais. As frentes de projetos descrevem aplicações dos serviços; não representam cases comprovados. Não foram incluídas métricas, nomes de clientes, publicações ou integrantes de equipe sem confirmação.

## Publicação

O workflow `.github/workflows/deploy-pages.yml` gera e publica o conteúdo de `dist/` no GitHub Pages a cada push para `main`. Também pode ser iniciado manualmente pela aba Actions.

No repositório, selecione **Settings → Pages → Build and deployment → Source → GitHub Actions**. O endereço padrão é `https://barrosgg.github.io/serraresearch.org/`. A configuração de assets relativos em `vite.config.ts` funciona nesse caminho e também em um futuro domínio customizado.

DNS, domínio customizado e entrega de e-mails são configurações separadas.

Para futuras tarefas cloud, use o checkout existente em `/workspace/serraresearch.org`: cada tarefa já é isolada e não requer um Git worktree. Os processos de desenvolvimento precisam ser iniciados novamente após restaurar o ambiente.
