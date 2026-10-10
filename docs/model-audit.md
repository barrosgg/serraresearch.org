# Auditoria das referências Serra Research

Revisão de 10 de outubro de 2026. A página `/design-system/#model-audit` apresenta o inventário e os destinos. O JSON público `/design/model-audit.json` inclui os títulos originais, arquivos de origem, hashes SHA-256, classificação e seletores verificáveis.

## Escopo e correspondência

Foram inspecionados seis ZIPs e o texto colado. Os ZIPs contêm 11 HTMLs, dos quais nove são distintos. O modelo de publicações do ZIP 2 repete o do ZIP 1; os HTMLs de papelaria dos ZIPs 4 e 5 são idênticos. O texto colado contém três documentos HTML. Nenhum script dos anexos foi executado.

A matriz possui 167 registros: 37 implementados, 115 adaptados e 15 exemplos de desenvolvimento. A unidade é uma correspondência de título ou detalhe visual, não um componente único. As classificações distinguem a presença do padrão visual de uma cópia literal ou serviço operacional. Todos possuem destino no site, em português e inglês.

| Referência | Elementos disponíveis |
| --- | --- |
| 1: institucional, metodologia, cases, contato, publicações e marca | Landing page, serviços, metodologia, biblioteca, template e padrões complementares no design system |
| 2: biblioteca científica | Biblioteca com busca, filtros, destaque e detalhes científicos; editor de Markdown |
| 3: ilustração, gráficos, diagramas, mapas, grid e papelaria | Cinco ilustrações geométricas; quatro gráficos originais; esteiras territorial/MCP; mapa local; grid de 16 colunas e mockups |
| 4 e 5: papelaria | Timbrados, cartões, envelopes DL/C4, dossiê, credencial, conversão de cor e pré-impressão; nove SVGs e onze PDFs |
| 6: espectros e visualização avançada | Quatro famílias espectrais; OLS com KDE marginal; decomposição temporal; radar com três cenários; curva de duração de vazão; matriz territorial; paletas e contraste medido; download Mermaid |

## Laranja e contraste

O laranja da marca, preenchimentos dos botões ativos, ponto do logotipo, ícones gráficos, linhas de tendência, conectores e acentos térmicos é `#FD5638`. Hover mantém esse preenchimento. As variáveis `orange`, `actionOrange` e `accentText` documentam o mesmo valor. Os antigos preenchimentos `#FF896B` e `#FF9C82` foram removidos.

Tinta coral escura `#B83B24` permanece para texto pequeno, foco e contornos que precisam de mais contraste. Botões desabilitados, modo de alto contraste e estados de erro têm cores semânticas próprias. Transparências, gradientes e sombras derivados do laranja não são novas cores de marca. Azul, verde, amarelo, carmim e índigo representam outras famílias de dados.

`#FD5638` sobre branco tem aproximadamente 3,20:1: atende texto grande, mas não texto pequeno AA nem AAA. O texto e os ícones dos botões usam `#FFFFFF`, em 19 px e peso 700, atendendo ao mínimo de 3:1 para texto grande. `#3A1B13` permanece como tinta de detalhes pequenos sobre laranja. A documentação calcula os índices em vez de repetir alegações AAA incorretas dos protótipos. O hero da landing page usa fundo branco para manter o contraste mínimo.

## Integridade dos gráficos e da arquitetura

Todos os dados são sintéticos. OLS e R² são calculados sobre os pontos demonstrativos; a KDE marginal usa kernel gaussiano e largura de banda 10. A decomposição temporal é uma construção didática com tendência, componente sazonal e resíduo: não executa STL/LOESS nem teste estatístico. A faixa temporal original continua ilustrativa. A curva de duração usa vazões positivas em eixo logarítmico, com Q10, Q50 e Q95 coerentes com a tabela. Cores de permanência não certificam risco hídrico.

Rótulos dentro dos SVGs são preenchidos, traduzidos e testados para caber nos respectivos retângulos. Os dados dos gráficos são acessíveis em tabelas e no CSV exportado.

No fluxo MCP, HNSW representa busca vetorial; H3, quando aplicável, representa células geoespaciais. Chunks requerem metadados de origem e versão. MCP expõe ferramentas e contratos, sem garantir respostas exatas. A entrega representa análise rastreável com revisão humana; o diagrama não presume certificação ICP-Brasil ou validade probatória.

## Adaptações explícitas

- O logotipo existente foi preservado. Cotas da marca alternativa não foram aplicadas.
- Pessoas, parceiros, depoimentos, métricas e newsletter possuem exemplos editáveis na documentação; não são fatos institucionais ou serviços ativos na landing page.
- Fotografias e materiais dos anexos foram reinterpretados como mockups locais. Não se afirma reprodução fotográfica literal.
- Selos ISO/FSC/OGC, credenciais, DOI, citações, revisões por pares e resultados fictícios não são copiados como fatos.
- Contato prepara e-mail. Upload para servidor, newsletter automática e integrações externas não possuem backend ativo.
- Arquivos gráficos são protótipos sRGB com dimensões nominais; não constituem PDF/X, prova ICC, equivalência Pantone ou faca industrial.

## Verificação reproduzível

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm test
```

`tests/model-audit.mjs`, executado pela suíte, navega pelos destinos reais da matriz em ambos os idiomas. Valida preenchimentos computados, cores dos gráficos, bordas espectrais, conectores, cinco etiquetas MCP, downloads, XML dos SVGs, encaixe dos rótulos e cabeçalhos PDF. O resultado detalhado fica em `test-results/model-audit.json`; o resumo integra `test-results/report.json`.

A suíte existente também verifica navegação, formulários, filtros, editor, modais, marca, rolagem suave/movimento reduzido, oito larguras, texto a 130%, assets e acessibilidade automatizada com axe. Essas verificações demonstram presença, comportamento e consistência dos padrões implementados; não certificam serviços externos, impressão industrial ou acessibilidade integral por avaliação humana.

### Resultado da revisão local de 10/10/2026

Build e suíte completos passaram. Foram conferidos 167 registros em dois idiomas (334 destinos), 42 usos de cor calculada e 58 downloads. As 27 checagens de páginas com axe, além das checagens de landing page, preferências e modais, terminaram sem violações detectadas. Não houve erro de JavaScript nem falha de requisição de assets. O pacote de papelaria foi aberto e seus 26 arquivos comparados byte a byte com os originais.

A conferência final dos ícones da esteira corrigiu uma regra CSS que ainda usava tinta coral escura. Após o ajuste, a auditoria completa de correspondência foi repetida: 334 destinos, 44 checagens de cor e 58 downloads passaram; axe também passou novamente nas duas páginas do design system. O teste inclui explicitamente os cinco ícones em `#FD5638`.

A revisão das ações valida fundo `#FD5638`, texto e setas `#FFFFFF`, tamanho mínimo de 19 px e peso 700, além dos estados de hover e foco. Inclui menu lateral, formulários, publicações e exemplos do design system. Os marcadores de seção da landing page usam o coral canônico sobre branco. A suíte completa passou com 27 checagens de páginas e os quatro modais de atuação sem violações detectadas pelo axe.
