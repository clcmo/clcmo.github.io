// index.ts

const title = document.querySelector<HTMLHeadingElement>('.title');
const subtitle = document.querySelector<HTMLParagraphElement>('.subtitle');

if (title) title.textContent = 'Camila Leite Oliveira';
if (subtitle) subtitle.textContent = 'Desenvolvedora Front‑end • Professora • Portfólio e Projetos';

document.querySelectorAll<HTMLAnchorElement>('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '#';
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.alert('Seção ' + href + ' ainda não implementada.');
  });
});

(function createProjectsSection() {
  // se já existir (por exemplo em HTML), não duplicar
  if (document.getElementById('projetos')) return;

  const section = document.createElement('section');
  section.id = 'projetos';
  section.className = 'projetos-section';
  section.innerHTML = `
    <div class="container">
      <h2 class="projects-title">Projetos</h2>
      <ul class="projects-list">
        <li><a class="project-link" href="https://example.com/bartoinfo" target="_blank" rel="noopener noreferrer">BartoInfo</a></li>
        <li><a class="project-link" href="https://example.com/apprendendo" target="_blank" rel="noopener noreferrer">Apprendendo</a></li>
        <li><a class="project-link" href="https://example.com/re_ciclo" target="_blank" rel="noopener noreferrer">Re_ciclo</a></li>
      </ul>
    </div>
  `;
  // inserir após o main hero, se existir; senão no final do body
  const main = document.querySelector('main') || document.body;
  main.insertAdjacentElement('afterend', section);

  // interação mínima: abrir em nova aba já definida pelo target, mas permitir keyboard focus
  section.querySelectorAll<HTMLAnchorElement>('.project-link').forEach(a => {
    a.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') a.click();
    });
  });
})();

// cria sessão "Contato" com links (substitua os hrefs pelos links reais do gravatar)
(function createContactSection() {
  if (document.getElementById('contato')) return;

  const contacts = [
    { name: 'Gravatar', href: 'https://gravatar.com/calecmo' },
    { name: 'Email', href: 'mailto:seu@email.com' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/seu-perfil' },
    { name: 'GitHub', href: 'https://github.com/seu-usuario' }
  ];

  const section = document.createElement('section');
  section.id = 'contato';
  section.className = 'contato-section';
  section.innerHTML = `
    <div class="container">
      <h2 class="contact-title">Contato</h2>
      <ul class="contact-list">
        ${contacts.map(c => `<li><a class="contact-link" href="${c.href}" target="_blank" rel="noopener noreferrer">${c.name}</a></li>`).join('')}
      </ul>
    </div>
  `;

  const projetos = document.getElementById('projetos');
  if (projetos) projetos.insertAdjacentElement('afterend', section);
  else document.body.appendChild(section);

  // acessibilidade: permitir Enter em foco
  section.querySelectorAll<HTMLAnchorElement>('.contact-link').forEach(a => {
    a.addEventListener('keydown', ev => { if (ev.key === 'Enter') a.click(); });
  });

  section.innerHTML = `
    <div class="container">
      <h2 class="contact-title">Contato</h2>
      <ul class="contact-list">
        ${contacts.map(c => `<li><a class="contact-link" href="${c.href}" target="_blank" rel="noopener noreferrer">${c.name}</a></li>`).join('')}
      </ul>
      <p class="credits">Desenvolvido por <a href="https://dev.camilaloliveira.me" target="_blank" rel="noopener noreferrer">Camila L. Oliveira</a></p>
    </div>
  `;
})();

// adiciona ícones aos links de projetos e contatos e cria toggle de tema
(function enhanceUI() {
  // adiciona ícones padrão se existirem elementos
  document.querySelectorAll<HTMLAnchorElement>('.project-link').forEach((a) => {
    if (!a.querySelector('.fa')) {
      const i = document.createElement('i');
      i.className = 'fa-solid fa-folder-open';
      a.prepend(i);
    }
  });

  document.querySelectorAll<HTMLAnchorElement>('.contact-link').forEach((a) => {
    if (!a.querySelector('.fa')) {
      // escolher ícone por texto do link (simples heurística)
      const text = (a.textContent || '').toLowerCase();
      const i = document.createElement('i');
      if (text.includes('gravatar')) i.className = 'fa-brands fa-gravatar';
      else if (text.includes('email')) i.className = 'fa-solid fa-envelope';
      else if (text.includes('linkedin')) i.className = 'fa-brands fa-linkedin';
      else if (text.includes('github')) i.className = 'fa-brands fa-github';
      else i.className = 'fa-solid fa-link';
      a.prepend(i);
    }
  });

  // criar botão de alternância de tema dentro do card-content (se ainda não existir)
  const cardContent = document.querySelector('.card-content');
  if (cardContent && !document.querySelector('.theme-toggle')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = `<i class="fa-regular fa-circle-half-stroke" aria-hidden="true"></i><span class="sr-only">Alternar tema</span><span class="label">Tema</span>`;
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const isLight = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', isLight ? '': 'light');
      btn.setAttribute('aria-pressed', String(!isLight));
      localStorage.setItem('site-theme', isLight ? 'dark' : 'light');
    });
    // inserir no topo das ações, ou no final do card-content
    const actions = cardContent.querySelector('.actions');
    if (actions) actions.insertAdjacentElement('afterend', btn);
    else cardContent.appendChild(btn);
  }

  // restaurar preferência salva
  const pref = localStorage.getItem('site-theme');
  if (pref === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

