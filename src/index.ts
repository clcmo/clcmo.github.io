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
