// index.ts

const title = document.querySelector<HTMLHeadingElement>('.title');
const subtitle = document.querySelector<HTMLParagraphElement>('.subtitle');

if (title) title.textContent = 'Camila Oliveira';
if (subtitle) subtitle.textContent = 'Desenvolvedora Front‑end • Portfólio e projetos';

document.querySelectorAll<HTMLAnchorElement>('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '#';
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.alert('Seção ' + href + ' ainda não implementada.');
  });
});

