import { initThemeToggle } from './ui/theme';
import { createProjectsSection } from './ui/projects';
import { createContactSection } from './ui/contact';
import './ui/icons';

// atualizar título e subtítulo

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

// criar seções e UI
createProjectsSection();
createContactSection();
initThemeToggle();