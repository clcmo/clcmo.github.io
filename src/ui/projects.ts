// ...existing code...
export function createProjectsSection() {

  if (document.getElementById('projetos')) return;
  
  const projects = [
    { name: 'BartoInfo', href: 'https://bartoinfo.github.io', icon: 'fa-solid fa-folder-open' },
    { name: 'Apprendendo', href: 'https://apprendendo.blog', icon: 'fa-solid fa-book' },
    { name: 'Re_ciclo', href: '#', icon: 'fa-solid fa-recycle' }
  ];
  
  const section = document.createElement('section');
  
  section.id = 'projetos';
  section.className = 'projetos-section';
  section.innerHTML = `
    <div class="container">
      <h2 class="projects-title">Projetos</h2>
      <ul class="projects-list">
        ${projects.map(p => `<li><a class="project-link" href="${p.href}" target="_blank" rel="noopener noreferrer"><i class="${p.icon}" aria-hidden="true"></i><span class="project-name">${p.name}</span></a></li>`).join('')}
      </ul>
    </div>
  `;
  
  const main = document.querySelector('main') || document.body;
  main.insertAdjacentElement('afterend', section);
}