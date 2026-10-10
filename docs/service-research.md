# Referências dos modais de atuação

Pesquisa editorial organizada em 10/10/2026 para as quatro áreas da Serra Research. O conteúdo publicado está em `src/lib/service-research.ts`, nos dois idiomas. Os links de tecnologias e fontes ficam dentro dos modais. Não representa inventário de software instalado, contratos de fornecedores ou projetos já executados.

## Material consultado

Foram consultados READMEs e arquivos de licença dos mantenedores no GitHub. As capacidades descritas foram limitadas ao que esses projetos documentam; modelos, dados, hospedagem e serviços podem ter condições diferentes da licença do código.

| Tema | Documentação consultada | Aplicação editorial |
| --- | --- | --- |
| Tabelas, estatística e modelagem | [pandas](https://github.com/pandas-dev/pandas), [DuckDB](https://github.com/duckdb/duckdb), [statsmodels](https://github.com/statsmodels/statsmodels), [scikit-learn](https://github.com/scikit-learn/scikit-learn) | Integração, análise de microdados, inferência e avaliação de modelos. Pesos e desenho amostral precisam ser tratados explicitamente. |
| Linguagem natural | [spaCy](https://github.com/explosion/spaCy), [Transformers](https://github.com/huggingface/transformers) | Entidades, classificação, embeddings e NLP. A licença da biblioteca não cobre automaticamente cada modelo. |
| Documentos | [Tesseract](https://github.com/tesseract-ocr/tesseract), [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR), [Docling](https://github.com/docling-project/docling) | OCR, layout, tabelas e conversão. OCR de um documento preexistente não o transforma em coleta primária de pesquisa. |
| Busca e conexão à IA | [pgvector](https://github.com/pgvector/pgvector), [Qdrant](https://github.com/qdrant/qdrant), [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) | Busca vetorial, recursos e ferramentas. MCP não oferece garantia de eliminação de alucinações. |
| Geoespacial | [QGIS](https://github.com/qgis/QGIS), [GDAL](https://github.com/OSGeo/gdal), [GeoPandas](https://github.com/geopandas/geopandas), [MapLibre](https://github.com/maplibre/maplibre-gl-js) | Processamento, cruzamentos espaciais e mapas. Fontes de tiles, mapas-base e dados têm termos próprios. |
| Coleta e painéis | [ODK Collect](https://github.com/getodk/collect), [KoboToolbox KPI](https://github.com/KoBoToolbox/kpi), [Superset](https://github.com/apache/superset) | Formulários de campo, coleta e visualização. Hospedagem pode ser paga ou ter condições específicas. |
| APIs e serviços Google | [Earth Engine API](https://github.com/google/earthengine-api), [Google Maps client](https://github.com/googlemaps/google-maps-services-python) | SDKs abertos acessam serviços proprietários. Não se deve classificar o serviço como open source apenas pela licença do cliente. |
| OCR gerenciado | [Azure Document Intelligence SDK](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/documentintelligence/azure-ai-documentintelligence), [documentação Textract](https://github.com/awsdocs/amazon-textract-developer-guide/blob/master/doc_source/what-is.md) | Extração gerenciada, documentos, formulários e tabelas; autenticação e tratamento externo dos dados. |
| LLMs hospedados | [OpenAI Python SDK](https://github.com/openai/openai-python) | O cliente aberto não torna o serviço ou os modelos hospedados abertos. Escolha depende de finalidade, confidencialidade e termos. |
| Legislativo | [Câmara dos Deputados — documentação oficial](https://github.com/CamaraDosDeputados/dados-abertos) e [wiki](https://github.com/CamaraDosDeputados/dados-abertos/wiki) | API REST, JSON/XML e arquivos tabulares para proposições, tramitação, votações, eventos e órgãos. |
| Microdados e bases brasileiras | Pipelines de [PNAD Contínua](https://github.com/basedosdados/pipelines/tree/main/pipelines/datasets/br_ibge_pnadc), [Enem](https://github.com/basedosdados/pipelines/tree/main/pipelines/datasets/br_inep_enem), [Novo Caged](https://github.com/basedosdados/pipelines/tree/main/pipelines/datasets/br_me_caged), [Senado](https://github.com/basedosdados/pipelines/tree/main/pipelines/datasets/br_senado_dados_abertos), [CGU](https://github.com/basedosdados/pipelines/tree/main/pipelines/datasets/br_cgu_orcamento_publico), [MapBiomas](https://github.com/basedosdados/pipelines/tree/main/pipelines/datasets/br_mapbiomas_estatisticas) | Documentação técnica secundária com referências aos provedores, formatos e rotinas de extração. Não substitui os dicionários e termos oficiais da edição usada no projeto. |

## Limites da verificação

O ambiente retornou HTTP 403 no proxy ao tentar acessar diretamente alguns portais governamentais, incluindo IBGE, INEP/gov.br e a API da Câmara. A documentação oficial da Câmara foi consultada no GitHub; os pipelines da Base dos Dados forneceram evidência secundária para parte das bases. Os links oficiais foram mantidos como referências dos responsáveis pelas fontes, sem alegar download de todas as bases, acesso a APIs ou teste de funcionamento de cada portal.

SIDRA, malhas do IBGE, Ideb, DATASUS, MDS, STF, DOU, ANA, Copernicus e Fala.BR compõem um catálogo de fontes possíveis, descritas de forma geral. A disponibilidade atual de arquivos, séries e endpoints não foi validada diretamente nesta execução. O mesmo vale para a documentação web do Power BI. Antes de iniciar um projeto, é necessário confirmar edição, cobertura, licença, formato e possibilidade de acesso. A página da organização TerraBrasilis e o README de seu dashboard foram consultados, mas não fornecem validação das especificações atuais de cada produto.

## Decisões de conteúdo

- Separar software aberto de serviços proprietários e apontar que licenças de código, modelos, dados e hospedagem são independentes.
- Apresentar coleta e desenvolvimento como possibilidades definidas no desenho de cada projeto, sem inventar resultados, clientes ou infraestruturas existentes.
- Distinguir dados públicos agregados de cadastros nominais protegidos; não apresentar acesso irrestrito a CadÚnico ou outros registros pessoais.
- Identificar MapBiomas como iniciativa colaborativa não governamental.
- Diferenciar alertas DETER de estimativas PRODES e evitar precisão territorial não sustentada por microdados amostrais.
- Descrever comparação de baseline e acompanhamento sem inferir causalidade automaticamente. Atribuição causal requer desenho adequado e contrafactual.
- Incluir rastreabilidade, validação humana, incerteza e proteção de comunidades nos entregáveis e indicadores.

## Manutenção

Revisar fontes e tecnologias ao atualizar os modais. Conferir licenças nos repositórios, URLs dos provedores e dicionários da edição efetivamente adotada. Em caso de alteração de dados ou termos, atualizar português e inglês juntos. Não acrescentar funcionalidades, dados ou métricas que o projeto não possa sustentar.
