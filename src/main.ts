import '@fontsource/space-grotesk/latin-400.css';
import '@fontsource/space-grotesk/latin-500.css';
import '@fontsource/space-grotesk/latin-600.css';
import '@fontsource/space-grotesk/latin-700.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import './style.css';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const northeast = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const icons: Record<string, string> = {
  radar: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 6-6M12 2v2M22 12h-2M12 22v-2M2 12h2"/><circle cx="12" cy="12" r="1"/>',
  data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
  research: '<path d="M9 3h6M10 3v7L4 20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1l-6-10V3M7 16h10"/><path d="m10 13 1 1m3 4 1 1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  layers: '<path d="m12 3 10 6-10 6L2 9l10-6ZM2 13l10 6 10-6M2 17l10 6 10-6"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
};
const icon = (name: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

const services = [
  { name: 'Radar Legislativo & Análise de Risco Regulatório', icon: 'radar', code: 'REG / 01', description: 'Antecipe mudanças. Transforme o cenário regulatório em inteligência para agir.', full: 'Monitoramos proposições no Congresso Nacional, decisões do STF e a atuação de agências reguladoras com algoritmos de processamento de linguagem natural e análise preditiva orientada a direitos humanos e sustentabilidade.', tags: ['NLP', 'Análise preditiva', 'Direitos humanos'], items: ['Monitoramento de proposições e tendências legislativas', 'Classificação temática e análise de riscos regulatórios', 'Sistemas especialistas para apoiar decisões estratégicas'] },
  { name: 'Preparação de dados e servidores MCP', icon: 'data', code: 'AI / 02', description: 'Transformamos papel e documentos não estruturados em bases consultáveis, dados para análise e conhecimento conectado à IA.', full: 'Combinamos diferentes frameworks e tecnologias avançadas de OCR para extrair informações de papel e documentos sem estrutura ou padronização. Organizamos dados estruturados, segmentos de conteúdo (chunks) e representações vetoriais (embeddings), criando bancos de dados vetoriais. Essas bases apoiam análises históricas e de inteligência e se conectam a modelos de linguagem (LLMs) por servidores Model Context Protocol (MCP), com fontes verificáveis e contexto para a tomada de decisão.', tags: ['OCR & extração', 'Bancos vetoriais', 'MCP & LLMs'], items: ['OCR, raspagem e extração de dados de documentos não estruturados', 'Preparação de chunks, embeddings e bancos de dados vetoriais', 'Dados estruturados para análises históricas, LLMs e servidores MCP'] },
  { name: 'Inteligência geoespacial', icon: 'globe', code: 'GEO / 03', description: 'Leia o território. Revele relações entre ambiente, comunidades e desenvolvimento.', full: 'Combinamos sensoriamento geoespacial, modelagem estatística e visualização de dados para investigar desafios socioambientais e territoriais. Conectamos múltiplas bases públicas e usamos Earth, Google Maps Platform e APIs públicas para contextualizar o território. Integramos dados de monitoramento ambiental e desenvolvemos plataformas web para leitura de indicadores.', tags: ['Sensoriamento', 'Mapas & indicadores', 'APIs ambientais'], items: ['Visualização de dados geoespaciais e indicadores', 'Automação de fluxos e APIs de monitoramento ambiental em tempo real', 'Plataformas web customizadas e painéis de decisão'] },
  { name: 'Pesquisa aplicada e estratégia', icon: 'research', code: 'RES / 04', description: 'Pesquisa em educação, socioeconomia e território: dos microdados e da escuta local aos indicadores de resultado e impacto.', full: 'Atuamos com pesquisa em educação, socioeconomia e território a partir da conexão de múltiplas bases públicas e da análise minuciosa de microdados disponibilizados por órgãos públicos, incluindo informações obtidas pela Lei de Acesso à Informação (LAI). Estabelecemos uma linha de base (baseline) com lideranças dos territórios e medimos resultados regularmente para produzir indicadores de resultado e impacto de longo prazo. Combinamos modelagem estatística, relatórios de impacto e suporte estratégico para governos, fundos de investimento socioambiental e organizações da sociedade civil.', tags: ['Educação & socioeconomia', 'Microdados', 'Impacto de longo prazo'], items: ['Conexão de bases públicas e análise minuciosa de microdados', 'Construção de baseline com lideranças dos territórios', 'Medição regular de resultados e indicadores de impacto de longo prazo'] },
];

const contour = () => {
  let paths = '';
  for (let i = 0; i < 19; i++) {
    const k = i * 13;
    paths += `<path d="M${-70 + k * .6} ${510 - k * .65} C${80 + k * .6} ${510 - k * .9},${30 + k * .5} ${220 - k * .7},${210 + k * .25} ${205 - k * .75} S${330 + k * .15} ${385 - k * .65},${560 + k * .4} ${200 - k * .65}"/>`;
  }
  return `<svg class="contours" viewBox="0 0 560 500" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width=".7">${paths}</g></svg>`;
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="wordmark" href="#inicio" aria-label="Serra Research — início">Serra <span>Research</span><i></i></a>
    <nav id="navigation" aria-label="Navegação principal">
      <a href="#atuacao">Atuação</a><a href="#dados">Dados e pesquisa</a><a href="#projetos">Projetos</a><a href="#metodologia">Metodologia</a><a href="#contato">Contato</a>
    </nav>
    <a class="button button-small header-cta" href="#contato">Vamos conversar ${northeast}</a>
    <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="navigation"><span></span><span></span></button>
  </div>
</header>
<main id="conteudo">
  <section class="hero section" id="inicio" aria-labelledby="hero-title">
    <div class="container hero-grid">
      <div class="hero-copy">
        <div class="eyebrow"><span class="status-dot"></span> PESQUISA APLICADA. IMPACTO REAL.</div>
        <h1 id="hero-title">Inteligência analítica e ciência de dados para decisões de alto <span>impacto socioambiental.</span></h1>
        <p class="hero-lead">A Serra Research combina pesquisa aplicada, sensoriamento geoespacial, preparação de dados para Inteligência Artificial e radares preditivos legislativos para impulsionar a agenda de sustentabilidade, direitos humanos e governança regulatória.</p>
        <div class="hero-actions"><a class="button" href="#atuacao">Conheça nossa atuação ${arrow}</a><a class="text-link" href="#metodologia">Nosso método ${northeast}</a></div>
      </div>
      <div class="hero-visual" aria-label="Representação conceitual de camadas de dados conectadas">
        <div class="visual-top mono"><span>SERRA / RESEARCH LAB</span><span>01 — 04</span></div>
        <div class="orb"></div>${contour()}
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
        <span class="coordinate coordinate-one mono">DADOS → EVIDÊNCIA</span>
        <span class="coordinate coordinate-two mono">CIÊNCIA → IMPACTO</span>
        <div class="visual-cross cross-one">+</div><div class="visual-cross cross-two">+</div>
        <div class="visual-card"><span class="mini-icon">${icon('layers')}</span><div><span class="mono">INTELIGÊNCIA CONECTADA</span><strong>Uma visão. Múltiplas camadas.</strong></div><span class="card-dot"></span></div>
        <div class="visual-bottom mono"><span>COMPLEXIDADE EM PERSPECTIVA</span><span>FIG. 01 / SERRA</span></div>
      </div>
    </div>
    <div class="container hero-bottom"><span class="mono">DA PESQUISA À TOMADA DE DECISÃO</span><a href="#atuacao" aria-label="Explorar atuação">Role para explorar <span>↓</span></a></div>
  </section>
  <div class="disciplines" aria-label="Nossas disciplinas"><div class="container"><span>Pesquisa aplicada</span><i>+</i><span>Inteligência geoespacial</span><i>+</i><span>Engenharia de dados</span><i>+</i><span>Análise preditiva</span></div></div>

  <section class="section expertise" id="atuacao" aria-labelledby="expertise-title">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">01 / ÁREAS DE ATUAÇÃO</span><h2 id="expertise-title">Complexidade é o ponto de partida.<br><span>Clareza é o que entregamos.</span></h2></div><p>Quatro frentes complementares para transformar dados em conhecimento e conhecimento em decisões de impacto.</p></div>
      <div class="services-grid">${services.map((s, i) => `<article class="service-card"><div class="service-top"><span class="service-icon">${icon(s.icon)}</span><span class="service-index mono"><span>${String(i + 1).padStart(2, '0')}</span>${s.code}</span></div><h3>${s.name}</h3><p>${s.description}</p><div class="tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div><button class="service-more text-link" data-service="${i}" aria-label="Saiba mais sobre ${s.name}">Explorar solução ${arrow}</button></article>`).join('')}</div>
    </div>
  </section>

  <section class="section connection" aria-labelledby="connection-title">
    <div class="container connection-grid">
      <div><span class="eyebrow">DADOS COM CONTEXTO</span><h2 id="connection-title">A informação certa.<br>Na decisão <span>certa.</span></h2><p>Um dado isolado não conta toda a história. Nossa engenharia conecta fontes, territórios e contextos para construir uma visão que orienta a ação.</p><a class="text-link" href="#contato">Encontre a solução para o seu desafio ${arrow}</a></div>
      <div class="flow-panel"><div class="flow-header"><span class="mono">ARQUITETURA DE INTELIGÊNCIA</span><span class="status-dot"></span></div>
        <div class="flow-tabs" role="tablist" aria-label="Frentes de inteligência"><button id="tab-territorio" role="tab" aria-selected="true" aria-controls="flow-content" tabindex="0" data-flow="0">Território</button><button id="tab-regulacao" role="tab" aria-selected="false" aria-controls="flow-content" tabindex="-1" data-flow="1">Regulação</button><button id="tab-ia" role="tab" aria-selected="false" aria-controls="flow-content" tabindex="-1" data-flow="2">Inteligência artificial</button></div>
        <div id="flow-content" role="tabpanel" aria-labelledby="tab-territorio" tabindex="0"></div>
        <div class="flow-footer mono">FONTES → CONTEXTO → DECISÃO <span>DIAGRAMA CONCEITUAL</span></div>
      </div>
    </div>
    <div class="container context-grid" id="dados" role="region" aria-label="Dados, tecnologias e pesquisa">
      <article class="context-card">
        <span class="eyebrow">PESQUISA / DO TERRITÓRIO AO INDICADOR</span>
        <h3>Conhecer o ponto de partida.<br>Medir a transformação.</h3>
        <p>Pesquisamos educação, condições socioeconômicas e dinâmicas territoriais conectando múltiplas bases de dados públicas à realidade de quem vive nos territórios.</p>
        <ol class="context-steps">
          <li><span class="mono">01</span><div><h4>Conectar e investigar</h4><p>Cruzamos bases públicas e analisamos microdados de órgãos governamentais, incluindo informações obtidas pela Lei de Acesso à Informação (LAI).</p></div></li>
          <li><span class="mono">02</span><div><h4>Construir a linha de base</h4><p>Estabelecemos o baseline com lideranças dos territórios, combinando evidências quantitativas e conhecimento local.</p></div></li>
          <li><span class="mono">03</span><div><h4>Acompanhar resultados e impacto</h4><p>Medimos resultados regularmente e construímos indicadores para acompanhar mudanças e impacto de longo prazo.</p></div></li>
        </ol>
        <div class="context-tools"><span class="mono">DADOS E TECNOLOGIAS</span><div class="tags"><span>Earth</span><span>Google Maps Platform</span><span>APIs públicas</span><span>Microdados governamentais</span><span>LAI</span></div></div>
      </article>
      <article class="context-card">
        <span class="eyebrow">ENGENHARIA / DO DOCUMENTO À INTELIGÊNCIA</span>
        <h3>O conhecimento está nos documentos.<br>Nós tornamos esse dado utilizável.</h3>
        <p>Transformamos acervos em papel e documentos não estruturados ou padronizados em bases que permitem análises históricas, consultas e aplicações de inteligência artificial.</p>
        <ol class="context-steps">
          <li><span class="mono">01</span><div><h4>Reconhecer e extrair</h4><p>Combinamos frameworks e tecnologias avançadas de OCR para recuperar texto, tabelas e dados de diferentes formatos.</p></div></li>
          <li><span class="mono">02</span><div><h4>Estruturar e preparar</h4><p>Organizamos dados estruturados, segmentamos o conteúdo em chunks e geramos embeddings para criar bancos de dados vetoriais.</p></div></li>
          <li><span class="mono">03</span><div><h4>Conectar à análise e à IA</h4><p>Disponibilizamos essas bases para análises de dados e de inteligência, com acesso contextualizado por MCPs e modelos de linguagem (LLMs).</p></div></li>
        </ol>
        <details class="term-guide"><summary>O que são OCR, chunks e embeddings?</summary><dl><dt>OCR</dt><dd>Reconhecimento óptico de caracteres: transforma texto em imagens ou documentos digitalizados em texto processável.</dd><dt>Chunks</dt><dd>Segmentos de conteúdo organizados para facilitar a busca e preservar o contexto da informação.</dd><dt>Embeddings</dt><dd>Representações numéricas que permitem localizar conteúdos por semelhança de significado em bancos vetoriais.</dd></dl></details><div class="context-tools"><span class="mono">DADOS E TECNOLOGIAS</span><div class="tags"><span>OCR</span><span>Chunks & embeddings</span><span>Bancos vetoriais</span><span>MCPs</span><span>LLMs</span></div></div>
      </article>
    </div>
  </section>

  <section class="section projects" id="projetos" aria-labelledby="projects-title">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">02 / PROJETOS ESTRATÉGICOS</span><h2 id="projects-title">Rigor técnico.<br><span>Relevância no mundo real.</span></h2></div><p>Metodologias consolidadas para governos, fundos de investimento socioambiental e organizações da sociedade civil em desafios críticos de sustentabilidade.</p></div>
      <div class="project-grid">
        <article class="project-card"><div class="project-art territory-art" aria-hidden="true">${contour()}<span class="map-point p1"></span><span class="map-point p2"></span><span class="map-point p3"></span><div class="art-caption mono">TERRITÓRIO / CONTEXTO / IMPACTO</div></div><div class="project-copy"><span class="mono">GOVERNOS & POLÍTICAS PÚBLICAS</span><h3>Entender o território.<br>Planejar o futuro.</h3><p>Pesquisa em educação, socioeconomia e território, com microdados, indicadores geoespaciais e modelagem de cenários para apoiar políticas públicas.</p><a class="text-link" href="#contato" data-interest="Inteligência geoespacial">Discutir um projeto ${northeast}</a></div></article>
        <article class="project-card"><div class="project-art investment-art" aria-hidden="true"><div class="chart-grid"></div><svg viewBox="0 0 400 180"><path d="M0 160 55 130 110 140 170 78 220 95 280 40 330 55 400 10" fill="none" stroke="#FD5638" stroke-width="2"/><path d="M0 160 55 130 110 140 170 78 220 95 280 40 330 55 400 10V180H0Z" fill="url(#chart-fill)"/><defs><linearGradient id="chart-fill" x2="0" y2="1"><stop stop-color="#FD5638" stop-opacity=".18"/><stop offset="1" stop-color="#FD5638" stop-opacity="0"/></linearGradient></defs></svg><div class="art-caption mono">RISCO / EVIDÊNCIA / ESTRATÉGIA</div></div><div class="project-copy"><span class="mono">FUNDOS & INVESTIMENTO DE IMPACTO</span><h3>Antecipar riscos.<br>Qualificar decisões.</h3><p>Análise regulatória, sistemas preditivos e relatórios de impacto para orientar a alocação de recursos com evidências.</p><a class="text-link" href="#contato" data-interest="Radar Legislativo &amp; Análise de Risco Regulatório">Discutir um projeto ${northeast}</a></div></article>
        <article class="project-card"><div class="project-art network-art" aria-hidden="true"><svg viewBox="0 0 400 220"><g fill="none" stroke="#A7A9B0" stroke-width="1"><path d="m80 150 70-90 70 60 100-65M80 150l140-30 60 70M150 60l130 130 40-135M220 120l-30 85"/></g><g fill="#F4F5F8" stroke="#A7A9B0"><circle cx="80" cy="150" r="9"/><circle cx="150" cy="60" r="7"/><circle cx="320" cy="55" r="9"/><circle cx="280" cy="190" r="7"/><circle cx="190" cy="205" r="5"/></g><circle cx="220" cy="120" r="22" fill="#FD5638"/><circle cx="220" cy="120" r="35" fill="none" stroke="#FD5638" stroke-opacity=".25"/></svg><div class="art-caption mono">DIREITOS / CONHECIMENTO / AÇÃO</div></div><div class="project-copy"><span class="mono">ORGANIZAÇÕES DA SOCIEDADE CIVIL</span><h3>Conectar conhecimento.<br>Ampliar o impacto.</h3><p>Dados preparados para IA, automação e plataformas de indicadores para fortalecer a atuação em direitos humanos e sustentabilidade.</p><a class="text-link" href="#contato" data-interest="Preparação de dados e servidores MCP">Discutir um projeto ${northeast}</a></div></article>
      </div>
      <p class="project-note mono">FRENTES DE APLICAÇÃO — CADA PROJETO COMEÇA COM O SEU CONTEXTO.</p>
    </div>
  </section>

  <section class="section methodology" id="metodologia" aria-labelledby="method-title">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">03 / NOSSO MÉTODO</span><h2 id="method-title">Ciência na base.<br><span>Integridade em cada etapa.</span></h2></div><p>Dados para impacto socioambiental exigem integridade científica, proteção de comunidades vulneráveis e reprodutibilidade analítica.</p></div>
      <div class="principles"><article><span class="principle-icon">${icon('research')}</span><h3>Rigor científico</h3><p>Perguntas bem formuladas, métodos adequados e limites explicitados. Evidências antes de conclusões.</p></article><article><span class="principle-icon">${icon('shield')}</span><h3>Responsabilidade socioambiental</h3><p>Direitos humanos e proteção de comunidades vulneráveis orientam o desenho e a aplicação das soluções.</p></article><article><span class="principle-icon">${icon('code')}</span><h3>Transparência e reprodutibilidade</h3><p>Bases públicas rastreáveis, processos documentados e análises de microdados que podem ser compreendidas e verificadas.</p></article></div>
      <div class="process-heading"><h3>Da pergunta à decisão.</h3><span class="mono">UM PROCESSO, CINCO ETAPAS</span></div>
      <ol class="process"><li><span class="step-number mono">01 <span>↗</span></span><h4>Escuta e diagnóstico</h4><p>Entendemos o desafio com os atores e lideranças dos territórios e construímos a linha de base da pesquisa.</p></li><li><span class="step-number mono">02 <span>↗</span></span><h4>Desenho metodológico</h4><p>Definimos perguntas, fontes, critérios de qualidade e abordagem analítica.</p></li><li><span class="step-number mono">03 <span>↗</span></span><h4>Engenharia e análise</h4><p>Preparamos dados, integramos sistemas e construímos modelos e cenários.</p></li><li><span class="step-number mono">04 <span>↗</span></span><h4>Validação crítica</h4><p>Verificamos resultados, documentamos limites e avaliamos implicações.</p></li><li><span class="step-number mono">05 <span>✓</span></span><h4>Evidência para ação</h4><p>Entregamos indicadores e ferramentas, com medição regular de resultados e acompanhamento do impacto de longo prazo.</p></li></ol>
    </div>
  </section>

  <section class="section contact" id="contato" aria-labelledby="contact-title">
    <div class="container contact-grid">
      <div class="contact-copy"><span class="eyebrow">04 / VAMOS CONVERSAR</span><h2 id="contact-title">Qual é o próximo<br>desafio que vamos<br><span>investigar?</span></h2><p>Conte o contexto do seu projeto. Vamos construir o caminho entre a sua pergunta e uma decisão orientada por evidências.</p><a class="contact-email" href="mailto:oi@serraresearch.org">oi@serraresearch.org ${northeast}</a><div class="contact-meta mono"><span class="status-dot"></span> PESQUISA + TECNOLOGIA + IMPACTO</div></div>
      <form id="contact-form" class="contact-form"><h3>Comece uma conversa.</h3><p class="form-description">Conte sobre seu projeto. Campos com * são obrigatórios.</p><div class="form-row"><label>Seu nome <span>*</span><input name="name" autocomplete="name" placeholder="Seu nome" required maxlength="120"></label><label>E-mail <span>*</span><input name="email" type="email" autocomplete="email" placeholder="voce@organizacao.org" required maxlength="200"></label></div><label>Organização (opcional)<input name="organization" autocomplete="organization" placeholder="Nome da sua organização" maxlength="180"></label><label>Área de interesse (opcional)<select name="interest"><option value="">Vamos descobrir juntos</option>${services.map(s => `<option>${s.name}</option>`).join('')}</select></label><label>Sobre o projeto <span>*</span><textarea name="message" rows="4" placeholder="Qual desafio você quer resolver?" required minlength="10" maxlength="5000"></textarea></label><p class="form-note">Ao continuar, seu aplicativo de e-mail abrirá com a mensagem preenchida. Os dados deste formulário não são armazenados pelo site.</p><button class="button" type="submit">Preparar e-mail ${arrow}</button><p id="form-status" class="form-status" role="status" aria-live="polite"></p></form>
    </div>
  </section>
</main>
<footer class="site-footer"><div class="container"><div class="footer-top"><a class="wordmark" href="#inicio">Serra <span>Research</span><i></i></a><p>Inteligência analítica para<br>um futuro com mais evidências.</p><a class="text-link" href="#inicio">Voltar ao início ↑</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Serra Research</span><span class="mono">SUSTENTABILIDADE · DIREITOS HUMANOS · CIÊNCIA</span><button class="privacy-button" id="privacy-open">Privacidade</button></div></div></footer>
<dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Fechar detalhes">×</button><div id="dialog-content"></div></dialog>
`;

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const nav = document.querySelector<HTMLElement>('#navigation')!;
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!(e.target as Element).closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

const dialog = document.querySelector<HTMLDialogElement>('#detail-dialog')!;
const dialogContent = document.querySelector<HTMLDivElement>('#dialog-content')!;
document.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
function openDialog(content: string) { dialogContent.innerHTML = content; document.body.classList.add('dialog-open'); dialog.showModal(); }
const interest = document.querySelector<HTMLSelectElement>('select[name="interest"]')!;
document.querySelectorAll<HTMLButtonElement>('[data-service]').forEach(button => button.addEventListener('click', () => {
  const s = services[Number(button.dataset.service)];
  openDialog(`<span class="eyebrow">${s.code} / ÁREA DE ATUAÇÃO</span><span class="dialog-icon">${icon(s.icon)}</span><h2 id="dialog-title">${s.name}</h2><p>${s.full}</p><h3>Como podemos apoiar</h3><ul>${s.items.map(item => `<li>${icon('check')}<span>${item}</span></li>`).join('')}</ul><a id="dialog-contact" class="button" href="#contato">Converse sobre seu projeto ${arrow}</a>`);
  document.querySelector('#dialog-contact')!.addEventListener('click', () => { interest.value = s.name; dialog.close(); });
}));
document.querySelectorAll<HTMLAnchorElement>('[data-interest]').forEach(link => link.addEventListener('click', () => { interest.value = link.dataset.interest!; }));
document.querySelector('#privacy-open')!.addEventListener('click', () => openDialog(`<span class="eyebrow">TRANSPARÊNCIA</span><h2 id="dialog-title">Privacidade</h2><p>Este site não utiliza cookies de rastreamento, ferramentas de análise de visitantes nem armazena os dados digitados no formulário.</p><p>O botão “Preparar e-mail” abre seu aplicativo de e-mail. A mensagem só será enviada se você concluir o envio nesse aplicativo. Seu provedor de e-mail e o serviço de hospedagem podem tratar dados conforme suas próprias políticas.</p><p>Para solicitar informações sobre o tratamento de dados em comunicações com a Serra Research, escreva para <a href="mailto:oi@serraresearch.org">oi@serraresearch.org</a>.</p>`));

const flows = [
  { icon: 'globe', title: 'O território como evidência', source: 'BASES PÚBLICAS · MICRODADOS · APIs', processing: 'Análise geoespacial', result: 'Mapas e indicadores para acompanhar resultados e impacto nos territórios.' },
  { icon: 'radar', title: 'Mudanças em perspectiva', source: 'PROPOSIÇÕES · DECISÕES · NORMAS', processing: 'NLP e análise preditiva', result: 'Tendências e riscos regulatórios para orientar sua estratégia.' },
  { icon: 'data', title: 'Inteligência com fontes confiáveis', source: 'DOCUMENTOS · OCR · EMBEDDINGS', processing: 'Engenharia de dados + MCP', result: 'Dados estruturados e bancos vetoriais conectados a LLMs para análise e decisão.' },
];
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-flow]'));
function renderFlow(i: number) {
  const f = flows[i];
  tabs.forEach((tab, index) => { tab.setAttribute('aria-selected', String(index === i)); tab.tabIndex = index === i ? 0 : -1; });
  const panel = document.querySelector('#flow-content')!;
  panel.setAttribute('aria-labelledby', tabs[i].id);
  panel.innerHTML = `<h3>${f.title}</h3><div class="flow-source mono">${f.source}</div><div class="flow-line"><span>↓</span></div><div class="flow-engine">${icon(f.icon)}<span>${f.processing}</span><span class="engine-dot"></span></div><div class="flow-line"><span>↓</span></div><div class="flow-result">${f.result}</div>`;
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => renderFlow(i));
  tab.addEventListener('keydown', e => {
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault(); renderFlow(next); tabs[next].focus();
  });
});
renderFlow(0);

const nameField = document.querySelector<HTMLInputElement>('input[name="name"]')!;
const messageField = document.querySelector<HTMLTextAreaElement>('textarea[name="message"]')!;
nameField.addEventListener('input', () => nameField.setCustomValidity(nameField.value.trim() ? '' : 'Informe seu nome.'));
messageField.addEventListener('input', () => messageField.setCustomValidity(messageField.value.trim().length >= 10 ? '' : 'Descreva seu projeto com pelo menos 10 caracteres.'));

document.querySelector<HTMLFormElement>('#contact-form')!.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = `Olá, equipe Serra Research!\n\nMeu nome é ${String(data.get('name')).trim()}.\nE-mail: ${data.get('email')}\nOrganização: ${String(data.get('organization')).trim() || 'Não informada'}\nÁrea de interesse: ${data.get('interest') || 'A definir'}\n\nSobre o projeto:\n${String(data.get('message')).trim()}\n`;
  const subject = `Novo projeto — ${data.get('interest') || 'Serra Research'}`;
  const url = `mailto:oi@serraresearch.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const status = document.querySelector('#form-status')!;
  status.textContent = 'Mensagem preparada. Conclua o envio no seu aplicativo de e-mail. Se ele não abriu, copie a mensagem abaixo.';
  if (!document.querySelector('#copy-message')) {
    const copy = document.createElement('button'); copy.type = 'button'; copy.id = 'copy-message'; copy.className = 'text-link'; copy.textContent = 'Copiar mensagem →'; status.after(copy);
  }
  const mailLink = document.createElement('a');
  mailLink.href = url; mailLink.target = '_blank'; mailLink.rel = 'noopener';
  document.body.append(mailLink); mailLink.click(); mailLink.remove();
  document.querySelector<HTMLButtonElement>('#copy-message')!.onclick = async () => {
    try { await navigator.clipboard.writeText(`Para: oi@serraresearch.org\nAssunto: ${subject}\n\n${body}`); status.textContent = 'Mensagem copiada. Cole no seu e-mail e envie para oi@serraresearch.org.'; }
    catch { status.textContent = 'A cópia automática não está disponível. Copie o texto abaixo para o seu e-mail.'; const existing = document.querySelector<HTMLTextAreaElement>('#message-fallback'); if (existing) existing.value = body; else { const fallback = document.createElement('textarea'); fallback.id = 'message-fallback'; fallback.readOnly = true; fallback.setAttribute('aria-label', 'Mensagem preparada para copiar'); fallback.value = `Para: oi@serraresearch.org\nAssunto: ${subject}\n\n${body}`; status.after(fallback); } }
  };
});

const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]:not(#inicio), #dados'));
let scrollFramePending = false;
function updateNavigation() {
  const readingLine = Math.min(window.innerHeight * 0.28, 200);
  let active = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) active = section.id;
  }
  nav.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === `#${active}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function scheduleNavigationUpdate() {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(() => { updateNavigation(); scrollFramePending = false; });
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
updateNavigation();
