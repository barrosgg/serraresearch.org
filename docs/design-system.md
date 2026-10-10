# Design system v2.0

A documentação bilíngue fica em `/design-system/` e `/en/design-system/`. A revisão usa os anexos `stitch_serra_research_design_system (3).zip` e `(4).zip` como referências visuais. O logotipo continua sendo o do site: Serra em Space Grotesk 600, Research em 400 e ponto coral. A referência não altera a identidade institucional, as cores dos botões da landing ou os conteúdos científicos publicados.

## Organização

São 17 capítulos: identidade, ilustrações e espectros, diagramas de IA, visualização de dados, cartografia, grid, papelaria, cores, tipografia, superfícies, botões, componentes, formulários, ícones, interação, acessibilidade e implementação. A papelaria inclui sete subseções: timbrado A4, cartões frente/verso, envelopes DL/C4, dossiê/caixa, credenciais, conversão de cores e pré-impressão.

- `DesignSystem.astro`: estrutura, fundamentos e índice localizado.
- `DesignResearchModules.astro`: ilustrações, pipelines, quatro gráficos, mapa e apresentação da papelaria.
- `DesignPrintModules.astro`: aplicações físicas e especificações.
- `design-research.css`: composição editorial e layouts responsivos da documentação.
- `src/lib/research-design.ts`: dados sintéticos, espectros, grid analítico e estilos de mapas.
- `src/lib/design-system.ts`: tokens do site e extensão de pesquisa exportada em JSON.
- `src/scripts/design-system.ts`: controles locais de camadas e zoom do mapa ilustrativo.

O índice lateral acompanha somente os capítulos principais; as subseções impressas preservam o capítulo Papelaria como destino ativo. Links locais usam rolagem suave e levam o foco ao destino. A preferência `prefers-reduced-motion` e o ajuste de acessibilidade desativam a animação. O atalho final volta ao topo.

## Exemplos e downloads

As nove ilustrações SVG (cinco geométricas e quatro espectrais) são locais, sem scripts, fontes externas ou a marca alternativa do anexo. Os gráficos são demonstrações sintéticas, acompanhadas de tabelas e CSV. Não representam resultados, significância estatística, amostras reais ou desempenho da Serra Research. A faixa temporal é ilustrativa, não um intervalo de confiança calculado.

O mapa é SVG local, com camadas e zoom por teclado, sem incorporar serviço de terceiros ou transmitir coordenadas. O estilo Google Maps usa seu formato `stylers`; o estilo MapLibre usa versão 8 e uma geometria GeoJSON explicitamente demonstrativa. Os arquivos são separados e não intercambiáveis. Integrações reais precisam de fontes, projeções, licenças e configuração adequadas ao projeto.

O kit de papelaria contém nove SVGs, onze PDFs, timbrados HTML editáveis em português/inglês, referência de cores e checklist. Os arquivos têm fontes locais incorporadas e dimensões nominais. São protótipos sRGB: não incluem PDF/X, perfil ICC, faca industrial, credenciais válidas ou certificação. Conversões CMYK são aproximações matemáticas, sem equivalência Pantone presumida. A produção física exige prova e preparo com o fornecedor.

Para regenerar os SVGs e PDFs com o Chromium do ambiente:

```sh
node scripts/generate-design-print.mjs
python - <<'PY'
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path('public/design/print')
output = root / 'serra-stationery-kit.zip'
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in sorted(root.iterdir()):
        if file.is_file() and file != output:
            archive.write(file, 'serra-stationery-kit/' + file.name)
PY
```

Os arquivos gerados são versionados; o build e o deploy não dependem dessa etapa. Downloads em `/design/` ficam fora do sitemap. Os testes verificam capítulos, links, formatos dos dados, interação das camadas, marca existente, movimento reduzido, responsividade e contraste automatizado nas duas línguas, incluindo alto contraste.

O inventário dos anexos e a matriz de correspondência estão em [model-audit.md](model-audit.md) e no final da página do design system. `npm test` verifica os destinos em português e inglês, as cores calculadas e os arquivos de download.

Os botões laranja ativos usam `#FD5638` com texto e setas `#FFFFFF`, em 15 px e peso 600; na lateral, 14 px. O contraste de 3,20:1 não atende AA para texto normal. A escolha de cores e tipografia da marca é registrada como limitação conhecida nos relatórios, sem desativar as verificações do axe. O modo de alto contraste usa uma combinação mais escura. Marcadores de seção da landing page usam o laranja canônico diretamente sobre o fundo da seção, sem retângulos brancos ou preenchimento vertical. O contraste desses marcadores sobre `#F4F5F8` e `#F0F3FA` é, respectivamente, 2,93:1 e 2,87:1, abaixo do mínimo de 3:1 para texto grande; no alto contraste, o texto dos marcadores é escuro.

A lateral tem 248 px no desktop e 224 px entre 1.101 e 1.350 px, acompanhando a ampliação de texto. Seu botão usa altura mínima de 44 px, padding de 12 × 16 px e seta de 18 px; os rótulos padrão cabem em uma linha. A altura pode aumentar com a ampliação de texto para manter todo o conteúdo legível.

As linhas decorativas se concentram no rodapé do hero e em destaques editoriais. Cabeçalhos de seção e cards de atuação não repetem filetes em gradiente; espaçamento e superfícies organizam a landing page.
