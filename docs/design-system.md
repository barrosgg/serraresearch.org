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

Os botões laranja ativos usam `#FD5638` com texto e setas `#FFFFFF`, em 19 px e peso 700. O contraste de 3,20:1 atende AA para texto grande; a fonte 700 é carregada localmente. Marcadores de seção da landing page também usam o laranja canônico, com texto grande em fundo branco.
