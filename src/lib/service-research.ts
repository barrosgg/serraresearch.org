/** Editorial research references; these are project options, not a declaration of installed stacks or completed work. */
export type Bilingual = readonly [pt:string,en:string];
export const technologies = {
 pandas:{name:'pandas',url:'https://github.com/pandas-dev/pandas',note:['Integração, limpeza e análise de tabelas.','Table integration, cleaning and analysis.']},
 duckdb:{name:'DuckDB',url:'https://github.com/duckdb/duckdb',note:['SQL analítico sobre arquivos e bases locais.','Analytical SQL over files and local datasets.']},
 spacy:{name:'spaCy',url:'https://github.com/explosion/spaCy',note:['Entidades, classificação e processamento de linguagem natural.','Entities, classification and natural language processing.']},
 transformers:{name:'Transformers',url:'https://github.com/huggingface/transformers',note:['NLP e embeddings; modelos têm licenças próprias.','NLP and embeddings; models have their own licenses.']},
 sklearn:{name:'scikit-learn',url:'https://github.com/scikit-learn/scikit-learn',note:['Classificação, previsão e avaliação de modelos.','Classification, prediction and model evaluation.']},
 statsmodels:{name:'statsmodels',url:'https://github.com/statsmodels/statsmodels',note:['Modelagem estatística, inferência e séries temporais.','Statistical modeling, inference and time series.']},
 tesseract:{name:'Tesseract OCR',url:'https://github.com/tesseract-ocr/tesseract',note:['Reconhecimento de texto em documentos digitalizados.','Text recognition in scanned documents.']},
 paddle:{name:'PaddleOCR',url:'https://github.com/PaddlePaddle/PaddleOCR',note:['OCR, análise de layout e recuperação de tabelas.','OCR, layout analysis and table recovery.']},
 docling:{name:'Docling',url:'https://github.com/docling-project/docling',note:['Conversão de documentos e estrutura para processamento.','Document conversion and processing structure.']},
 pgvector:{name:'PostgreSQL + pgvector',url:'https://github.com/pgvector/pgvector',note:['Dados relacionais e busca vetorial no mesmo ambiente.','Relational data and vector search in one environment.']},
 qdrant:{name:'Qdrant',url:'https://github.com/qdrant/qdrant',note:['Busca por similaridade e filtros em bancos vetoriais.','Similarity search and filtering in vector databases.']},
 mcp:{name:'MCP SDK',url:'https://github.com/modelcontextprotocol/python-sdk',note:['Servidores com recursos e ferramentas para aplicações de IA.','Servers exposing resources and tools to AI applications.']},
 qgis:{name:'QGIS',url:'https://github.com/qgis/QGIS',note:['Análise territorial e cartografia em SIG.','Territorial analysis and GIS cartography.']},
 gdal:{name:'GDAL',url:'https://github.com/OSGeo/gdal',note:['Processamento e conversão de dados raster e vetoriais.','Raster and vector data processing and conversion.']},
 geopandas:{name:'GeoPandas',url:'https://github.com/geopandas/geopandas',note:['Cruzamentos espaciais e análise de dados geográficos.','Spatial joins and geographic data analysis.']},
 maplibre:{name:'MapLibre GL JS',url:'https://github.com/maplibre/maplibre-gl-js',note:['Mapas interativos; mapas-base e dados têm termos próprios.','Interactive maps; basemaps and data have their own terms.']},
 superset:{name:'Apache Superset',url:'https://github.com/apache/superset',note:['Painéis, exploração de indicadores e visualizações.','Dashboards, indicator exploration and visualizations.']},
 odk:{name:'ODK Collect',url:'https://github.com/getodk/collect',note:['Formulários de campo, inclusive com conectividade limitada.','Field forms, including in limited-connectivity settings.']},
 kobo:{name:'KoboToolbox',url:'https://github.com/KoBoToolbox/kpi',note:['Questionários e gestão de coleta; hospedagem tem condições próprias.','Questionnaires and collection management; hosting has separate terms.']},
 maps:{name:'Google Maps Platform',url:'https://developers.google.com/maps/documentation',note:['Geocodificação, rotas e mapas sujeitos a cotas, cobrança e termos.','Geocoding, routes and maps subject to quotas, billing and terms.']},
 earth:{name:'Google Earth / Earth Engine',url:'https://github.com/google/earthengine-api',note:['Serviços Google para exploração territorial e processamento geoespacial; o SDK aberto não torna o serviço open source.','Google services for territorial exploration and geospatial processing; the open SDK does not make the service open source.']},
 powerbi:{name:'Microsoft Power BI',url:'https://learn.microsoft.com/power-bi/fundamentals/power-bi-overview',note:['Visualização e distribuição de painéis em ambiente proprietário.','Dashboard visualization and distribution in a proprietary environment.']},
 azureocr:{name:'Azure AI Document Intelligence',url:'https://learn.microsoft.com/azure/ai-services/document-intelligence/overview',note:['Extração gerenciada de documentos, com cobrança e requisitos de tratamento de dados.','Managed document extraction, with billing and data-processing requirements.']},
 textract:{name:'Amazon Textract',url:'https://docs.aws.amazon.com/textract/latest/dg/what-is.html',note:['OCR e extração de tabelas/formulários como serviço proprietário.','OCR and table/form extraction as a proprietary service.']},
 llmapi:{name:'APIs comerciais de LLMs',url:'https://platform.openai.com/docs/overview',note:['Modelos hospedados, quando adequados à confidencialidade, ao orçamento e aos termos do projeto.','Hosted models, when compatible with project confidentiality, budget and terms.']},
} satisfies Record<string,{name:string;url:string;note:Bilingual}>;
export type Technology = keyof typeof technologies;
export const sources = {
 camara:{name:'Câmara dos Deputados — Dados Abertos',url:'https://dadosabertos.camara.leg.br/',description:['Proposições, tramitações, órgãos, eventos e votações.','Bills, legislative progress, bodies, events and votes.']},
 senado:{name:'Senado Federal — Dados Abertos',url:'https://www12.senado.leg.br/dados-abertos',description:['Matérias, agenda e tramitação legislativa, conforme o serviço.','Legislative matters, agenda and progress, depending on the service.']},
 stf:{name:'STF — Jurisprudência',url:'https://jurisprudencia.stf.jus.br/',description:['Decisões e jurisprudência publicadas; acesso sujeito às condições do portal.','Published decisions and case law; access is subject to portal conditions.']},
 dou:{name:'Imprensa Nacional — Diário Oficial da União',url:'https://www.in.gov.br/',description:['Atos normativos e publicações oficiais.','Regulatory acts and official publications.']},
 agencias:{name:'Agências reguladoras — dados abertos',url:'https://dados.gov.br/',description:['Catálogos e arquivos publicados por cada órgão; APIs e disponibilidade variam.','Catalogs and files published by each agency; APIs and availability vary.']},
 ibge:{name:'IBGE — Estatísticas e microdados',url:'https://www.ibge.gov.br/estatisticas/downloads-estatisticas.html',description:['PNAD Contínua, Censo e pesquisas com microdados disponíveis por edição.','Continuous PNAD, Census and surveys with microdata available by edition.']},
 sidra:{name:'IBGE — SIDRA',url:'https://sidra.ibge.gov.br/',description:['Tabelas agregadas de indicadores demográficos, sociais e econômicos.','Aggregated demographic, social and economic indicator tables.']},
 malhas:{name:'IBGE — Malhas territoriais',url:'https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais.html',description:['Limites territoriais e malhas para relacionar dados geográficos e estatísticos.','Territorial boundaries for linking geographic and statistical data.']},
 inep:{name:'INEP — Dados abertos e microdados',url:'https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados',description:['Censo Escolar, educação superior, Saeb e Enem, conforme edição e regras de divulgação.','School and higher-education censuses, Saeb and Enem, according to edition and disclosure rules.']},
 ideb:{name:'INEP — Ideb',url:'https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb',description:['Indicador educacional; cobertura e comparabilidade precisam ser verificadas.','Education indicator; coverage and comparability must be checked.']},
 datasus:{name:'Ministério da Saúde — DATASUS / TabNet',url:'https://datasus.saude.gov.br/informacoes-de-saude-tabnet/',description:['Indicadores e tabulações de saúde, mortalidade, nascimentos e serviços.','Health, mortality, birth and service indicators and tabulations.']},
 trabalho:{name:'Ministério do Trabalho — RAIS / Caged',url:'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho',description:['Emprego formal e movimentação do mercado de trabalho; extratos públicos e regras variam.','Formal employment and labor-market flows; public extracts and rules vary.']},
 mds:{name:'MDS — Dados e indicadores sociais',url:'https://aplicacoes.mds.gov.br/sagi/vis/data3/',description:['Informações públicas e agregadas sobre proteção social; cadastros nominais não são dados abertos irrestritos.','Public, aggregated social-protection information; named registries are not unrestricted open data.']},
 inpe:{name:'INPE — TerraBrasilis',url:'https://terrabrasilis.dpi.inpe.br/',description:['PRODES e DETER: produtos com finalidades, resoluções e períodos diferentes.','PRODES and DETER: products with different purposes, resolutions and periods.']},
 mapbiomas:{name:'MapBiomas — coleções de mapas',url:'https://brasil.mapbiomas.org/',description:['Iniciativa colaborativa, não governamental: uso e cobertura da terra e outros produtos, conforme coleção.','A collaborative, non-governmental initiative: land use and cover and other products, depending on the collection.']},
 ana:{name:'Agência Nacional de Águas — HidroWeb',url:'https://www.snirh.gov.br/hidroweb/',description:['Séries hidrológicas e pluviométricas, com verificação de qualidade e cobertura.','Hydrological and rainfall series, with quality and coverage checks.']},
 copernicus:{name:'Copernicus — Data Space',url:'https://dataspace.copernicus.eu/',description:['Observação da Terra, incluindo imagens Sentinel, com condições próprias de acesso.','Earth observation, including Sentinel imagery, subject to access conditions.']},
 transparencia:{name:'CGU — Portal da Transparência',url:'https://portaldatransparencia.gov.br/',description:['Despesas, transferências e execução de recursos públicos disponibilizados no portal.','Spending, transfers and public-funding execution made available by the portal.']},
 lai:{name:'CGU — Fala.BR / Acesso à informação',url:'https://falabr.cgu.gov.br/',description:['Solicitações pela LAI; abertura e divulgação dependem do conteúdo e da legislação.','Information requests under the LAI; disclosure depends on content and applicable legislation.']},
} satisfies Record<string,{name:string;url:string;description:Bilingual}>;
export type Source = keyof typeof sources;
export interface ResearchDetails {
 scope:Bilingual;
 open:Technology[];proprietary:Technology[];
 secondary:{title:Bilingual;description:Bilingual;sources:Source[]}[];
 primary:Bilingual[];platforms:Bilingual[];outputs:Bilingual[];quality:Bilingual;
}
export const serviceResearch:ResearchDetails[]=[
 {
 scope:['Uma arquitetura de monitoramento para conectar a agenda regulatória aos direitos humanos, às políticas públicas e à sustentabilidade. A seleção de fontes e tecnologias é definida em cada projeto.','A monitoring architecture connecting regulatory agendas to human rights, public policy and sustainability. Sources and technologies are selected for each project.'],
 open:['spacy','transformers','sklearn','pandas','duckdb','superset'],proprietary:['llmapi','powerbi'],
 secondary:[
  {title:['Legislação, decisões e agenda pública','Legislation, decisions and public agenda'],description:['Proposições, tramitações, votações, textos normativos, decisões públicas e consultas de órgãos reguladores. Não pressupomos uma API única para todos os órgãos nem acesso a processos sigilosos.','Bills, legislative progress, votes, regulatory texts, public decisions and agency consultations. We do not assume one API for all bodies or access to confidential proceedings.'],sources:['camara','senado','stf','dou','agencias']},
  {title:['Contexto socioeconômico e territorial','Socioeconomic and territorial context'],description:['Indicadores de população, educação, trabalho e uso da terra ajudam a identificar setores e territórios potencialmente afetados por uma mudança normativa.','Population, education, labor and land-use indicators help identify sectors and places potentially affected by a regulatory change.'],sources:['ibge','inep','trabalho','inpe']},
 ],
 primary:[
 ['Entrevistas e oficinas com especialistas, lideranças territoriais e organizações para identificar prioridades, riscos percebidos e critérios de materialidade.','Interviews and workshops with experts, local leaders and organizations to identify priorities, perceived risks and materiality criteria.'],
 ['Classificação humana de uma amostra de textos e validação especializada de alertas, criando dados de referência para avaliar o sistema.','Human classification of a text sample and expert validation of alerts, creating reference data to evaluate the system.'],
 ['Registros de decisões, respostas e ações de mitigação fornecidos pelos participantes do projeto, com finalidade e acesso definidos.','Records of decisions, responses and mitigation actions supplied by project participants, with defined purposes and access.'],
 ],
 platforms:[
 ['Radares web com filtros por tema, estágio de tramitação, órgão e território; linhas do tempo com vínculos para o documento original.','Web radars filtered by topic, legislative stage, body and territory; timelines linking back to the original document.'],
 ['APIs, alertas por regras ou modelos, matrizes de risco e painéis para acompanhamento de mudanças e respostas institucionais.','APIs, rule-based or model-based alerts, risk matrices and dashboards to track changes and institutional responses.'],
 ['Bases versionadas e trilhas de auditoria para revisar classificações, fontes e critérios de priorização.','Versioned datasets and audit trails for reviewing classifications, sources and prioritization criteria.'],
 ],
 outputs:[
 ['Temas emergentes, tendências regulatórias e oportunidades de participação em consultas públicas.','Emerging topics, regulatory trends and opportunities to participate in public consultations.'],
 ['Riscos e possíveis efeitos sobre direitos, acesso a serviços, comunidades vulneráveis e proteção ambiental.','Risks and possible effects on rights, service access, vulnerable communities and environmental protection.'],
 ['Indicadores de cobertura do monitoramento, qualidade dos alertas, tempo de resposta e execução de medidas de mitigação.','Indicators of monitoring coverage, alert quality, response time and execution of mitigation measures.'],
 ['Cenários e prioridades de ação; previsões só são apresentadas com avaliação retrospectiva, incerteza e revisão humana.','Scenarios and action priorities; predictions require backtesting, uncertainty assessment and human review.'],
 ],
 quality:['Tendências e classificações apoiam a análise; não garantem o desfecho de votações ou decisões judiciais. Avaliamos erros, vieses e mudanças de cobertura das fontes.','Trends and classifications support analysis; they do not guarantee legislative or judicial outcomes. We assess errors, biases and changes in source coverage.'],
 },
 {
 scope:['Do acervo documental à informação estruturada e consultável: extração, organização, busca e integração com IA, preservando rastreabilidade e controle de acesso.','From document archives to structured, searchable information: extraction, organization, retrieval and AI integration, preserving traceability and access control.'],
 open:['tesseract','paddle','docling','pgvector','qdrant','mcp','transformers','duckdb'],proprietary:['azureocr','textract','llmapi'],
 secondary:[
  {title:['Bases públicas de referência','Public reference datasets'],description:['Estatísticas e microdados podem contextualizar o acervo e fornecer dicionários, códigos e séries comparáveis. A escolha depende da pergunta, do período e da edição disponível.','Statistics and microdata can contextualize archives and supply dictionaries, codes and comparable series. Selection depends on the question, timeframe and available edition.'],sources:['ibge','sidra','inep','datasus']},
  {title:['Documentos e registros preexistentes','Existing documents and records'],description:['Diários oficiais, legislação, relatórios públicos e documentos obtidos pela LAI, além de acervos autorizados do contratante. Documentos preexistentes não se tornam dados primários de pesquisa apenas porque passaram por OCR.','Official gazettes, legislation, public reports and LAI disclosures, plus authorized client archives. Existing documents do not become primary research data merely because they undergo OCR.'],sources:['dou','camara','transparencia','lai']},
 ],
 primary:[
 ['Amostras anotadas por pessoas: texto correto, entidades, tabelas e relações, para testar extração e recuperação de informações.','Human-annotated samples: correct text, entities, tables and relations for testing extraction and information retrieval.'],
 ['Validações de especialistas e usuários sobre relevância, erros de OCR e qualidade das respostas, quando previstas no projeto.','Expert and user validation of relevance, OCR errors and response quality, when included in the project.'],
 ['Metadados produzidos no processamento: origem, página, versão, transformação, qualidade e registro de revisão humana.','Processing metadata: source, page, version, transformation, quality and human-review records.'],
 ],
 platforms:[
 ['Pipelines de ingestão e OCR; normalização em tabelas, JSON ou Parquet; catálogos com proveniência e dicionários de dados.','Ingestion and OCR pipelines; normalization into tables, JSON or Parquet; catalogs with provenance and data dictionaries.'],
 ['Busca semântica com chunks e embeddings, bancos vetoriais e interfaces que exibem a página ou trecho de origem.','Semantic retrieval with chunks and embeddings, vector databases and interfaces showing the original page or passage.'],
 ['Servidores MCP e APIs com permissões, registros de acesso e operações delimitadas; painéis de qualidade e revisão do acervo.','MCP servers and APIs with permissions, access records and bounded operations; quality and archive-review dashboards.'],
 ],
 outputs:[
 ['Séries históricas de indicadores e evidências recuperadas de documentos antes pouco acessíveis ou não estruturados.','Historical indicator series and evidence recovered from previously inaccessible or unstructured documents.'],
 ['Inventários de políticas, investimentos, compromissos e ações socioambientais com vínculos às fontes originais.','Inventories of policies, investments, commitments and social or environmental actions linked to original sources.'],
 ['Indicadores de completude, erros de extração, qualidade de busca e cobertura documental para orientar a validação.','Completeness, extraction-error, retrieval-quality and document-coverage indicators to guide validation.'],
 ['Bases reutilizáveis para relatórios, análises e apoio à decisão; respostas de IA acompanhadas de fontes e limites.','Reusable datasets for reports, analysis and decision support; AI responses accompanied by sources and limitations.'],
 ],
 quality:['MCP padroniza conexões, mas não elimina alucinações por si só. Usamos avaliação de recuperação, revisão humana, minimização de dados e análise das condições de envio a serviços externos.','MCP standardizes connections but does not eliminate hallucinations on its own. We use retrieval evaluation, human review, data minimization and assessment of external-service processing conditions.'],
 },
 {
 scope:['Conectamos observação da Terra, estatísticas e conhecimento local para ler desigualdades, pressões ambientais e acesso a serviços no território.','We connect Earth observation, statistics and local knowledge to understand inequalities, environmental pressures and access to services across territories.'],
 open:['qgis','gdal','geopandas','maplibre','duckdb','superset'],proprietary:['maps','earth','powerbi'],
 secondary:[
  {title:['Território, população e serviços','Territory, population and services'],description:['Malhas e estatísticas do IBGE, dados públicos de escolas e saúde para relacionar população, infraestrutura e acessibilidade. Microdados amostrais não oferecem precisão para qualquer bairro ou comunidade.','IBGE boundaries and statistics, and public school and health data to relate population, infrastructure and accessibility. Sample microdata does not provide precision for every neighborhood or community.'],sources:['malhas','ibge','inep','datasus']},
  {title:['Ambiente e observação da Terra','Environment and Earth observation'],description:['Desmatamento, alertas, uso e cobertura da terra, imagens orbitais e séries de chuva e vazão. Integramos produtos segundo resolução espacial, período, finalidade e regras de uso.','Deforestation, alerts, land use and cover, satellite imagery, rainfall and flow series. Products are integrated according to spatial resolution, timeframe, purpose and usage rules.'],sources:['inpe','mapbiomas','copernicus','ana']},
 ],
 primary:[
 ['Mapeamento participativo com lideranças: locais de uso, barreiras de acesso a serviços e percepções de risco, sem divulgar coordenadas sensíveis.','Participatory mapping with local leaders: places of use, service-access barriers and perceived risks, without disclosing sensitive coordinates.'],
 ['Observações georreferenciadas de campo, fotografias autorizadas e pontos de validação de classes de cobertura, conforme o desenho do estudo.','Georeferenced field observations, authorized photographs and land-cover validation points, according to study design.'],
 ['Medições locais e sensores, quando previstos: parâmetros ambientais, datas, métodos e calibração documentados.','Local measurements and sensors, when included: environmental parameters, dates, methods and documented calibration.'],
 ],
 platforms:[
 ['Mapas web com camadas, filtros temporais, comparação territorial e explicações das fontes e das unidades de medida.','Web maps with layers, time filters, territorial comparisons and explanations of sources and measurement units.'],
 ['APIs geoespaciais e painéis para monitoramento ambiental, com atualização definida conforme a frequência real de cada fonte.','Geospatial APIs and environmental-monitoring dashboards, updated according to each source’s actual frequency.'],
 ['Aplicativos de coleta e validação de campo, catálogos geográficos e rotinas reproduzíveis de cruzamento espacial.','Field collection and validation applications, geographic catalogs and reproducible spatial-join workflows.'],
 ],
 outputs:[
 ['Distribuição territorial de vulnerabilidade social e ambiental, com recortes agregados que protegem pessoas e comunidades.','Territorial distribution of social and environmental vulnerability, using aggregated breakdowns that protect people and communities.'],
 ['Acesso a escolas, serviços de saúde e infraestrutura; distâncias e tempos estimados com métodos e limitações explícitos.','Access to schools, health services and infrastructure; estimated distances and travel times with explicit methods and limitations.'],
 ['Mudanças de uso da terra, pressões sobre vegetação e exposição a riscos hídricos ou climáticos, conforme os dados disponíveis.','Land-use change, pressures on vegetation and exposure to water or climate risks, according to available data.'],
 ['Priorização de ações e acompanhamento de restauração ou serviços; estoque de carbono e causalidade exigem métodos e validação específicos.','Action prioritization and restoration or service monitoring; carbon stocks and causality require specific methods and validation.'],
 ],
 quality:['Alertas DETER e estimativas PRODES têm funções distintas; não são intercambiáveis. Comparações territoriais exigem compatibilização de limites, datas, projeções e qualidade das bases.','DETER alerts and PRODES estimates serve different purposes and are not interchangeable. Territorial comparisons require compatible boundaries, dates, projections and dataset quality.'],
 },
 {
 scope:['Pesquisa em educação, socioeconomia e território com linha de base construída com lideranças, análise de microdados e acompanhamento regular de resultados.','Research in education, socioeconomic conditions and territories, with baselines developed alongside local leaders, microdata analysis and regular outcome monitoring.'],
 open:['pandas','statsmodels','sklearn','duckdb','odk','kobo','superset'],proprietary:['powerbi','maps'],
 secondary:[
  {title:['Educação, população e desigualdades','Education, population and inequalities'],description:['Pesquisas do IBGE e dados do INEP para caracterizar escolarização, trajetórias, oferta educacional, renda e desigualdades. Pesos, desenho amostral, dicionários e mudanças entre edições são considerados.','IBGE surveys and INEP data to characterize schooling, trajectories, education provision, income and inequalities. We account for weights, sampling design, dictionaries and changes between editions.'],sources:['ibge','sidra','inep','ideb']},
  {title:['Trabalho, saúde e proteção social','Labor, health and social protection'],description:['Estatísticas de emprego formal, tabulações de saúde, informações sociais agregadas e execução de recursos públicos. Cadastros nominais e dados protegidos exigem autorização e base legal; não são assumidos como abertos.','Formal-employment statistics, health tabulations, aggregated social information and public-funding execution. Named registries and protected data require authorization and a legal basis; they are not assumed to be open.'],sources:['trabalho','datasus','mds','transparencia']},
 ],
 primary:[
 ['Questionários e entrevistas para construir baseline: condições de vida, acesso a serviços, trajetórias educacionais e demandas do território.','Questionnaires and interviews for baseline development: living conditions, service access, education trajectories and local needs.'],
 ['Oficinas e escuta com lideranças para definir indicadores relevantes; registros qualitativos com consentimento quando aplicável.','Workshops and listening sessions with local leaders to define relevant indicators; qualitative records with consent where applicable.'],
 ['Medições periódicas de resultados e acompanhamento de participantes ou grupos, quando o desenho e a proteção de dados permitirem.','Regular outcome measurement and participant or group follow-up, where study design and data safeguards allow it.'],
 ],
 platforms:[
 ['Formulários digitais, aplicativos de campo e sistemas de acompanhamento com validação, controle de acesso e histórico de alterações.','Digital forms, field applications and monitoring systems with validation, access control and change history.'],
 ['Painéis de indicadores, metas e séries temporais, com recortes por território e grupo quando a amostra sustentar a análise.','Indicator, target and time-series dashboards, with territorial and group breakdowns where the sample supports analysis.'],
 ['Bases versionadas, notebooks analíticos e relatórios técnicos que documentam amostragem, métodos e reprodutibilidade.','Versioned datasets, analytical notebooks and technical reports documenting sampling, methods and reproducibility.'],
 ],
 outputs:[
 ['Indicadores de acesso, permanência e resultados educacionais; renda, trabalho, acesso a serviços e desigualdades territoriais.','Indicators of education access, retention and outcomes; income, labor, service access and territorial inequalities.'],
 ['Comparações entre baseline e medições posteriores, com intervalos de incerteza e análise de diferenças entre grupos.','Comparisons between baseline and follow-up measurements, with uncertainty intervals and analysis of group differences.'],
 ['Indicadores de resultado e impacto de longo prazo, combinando evidências sociais e ambientais conforme a teoria de mudança.','Outcome and long-term impact indicators, combining social and environmental evidence according to the theory of change.'],
 ['Avaliação de efetividade e contribuição de programas; atribuição causal somente quando o desenho permitir, com contrafactual adequado.','Program effectiveness and contribution assessment; causal attribution only where study design permits, with an appropriate counterfactual.'],
 ],
 quality:['Medir mudança não demonstra, por si só, causalidade. Documentamos seleção da amostra, perdas de acompanhamento, vieses, incerteza e cuidados específicos com crianças e comunidades vulneráveis.','Measuring change does not, by itself, establish causality. We document sampling, attrition, biases, uncertainty and specific safeguards for children and vulnerable communities.'],
 },
];
export const licenses:Partial<Record<Technology,string>>={
 pandas:'BSD-3-Clause',duckdb:'MIT',spacy:'MIT',transformers:'Apache-2.0',sklearn:'BSD-3-Clause',statsmodels:'BSD-3-Clause',tesseract:'Apache-2.0',paddle:'Apache-2.0',docling:'MIT',pgvector:'PostgreSQL License',qdrant:'Apache-2.0',mcp:'MIT',qgis:'GPL-2.0+',gdal:'MIT (+)',geopandas:'BSD-3-Clause',maplibre:'BSD-3-Clause',superset:'Apache-2.0',odk:'Apache-2.0',kobo:'AGPL-3.0',
};
