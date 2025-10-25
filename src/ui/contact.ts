export function createContactSection() {
  
  if (document.getElementById('contato')) return;
  
  const contacts = [
    { name: 'Gravatar', href: 'https://gravatar.com/calecmo', icon: 'fa-brands fa-wordpress' },
    { name: 'Email', href: 'mailto:milla@apprendendo.blog', icon: 'fa-solid fa-envelope' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/clcmo', icon: 'fa-brands fa-linkedin' },
    { name: 'GitHub', href: 'https://github.com/clcmo', icon: 'fa-brands fa-github' }
  ];
  
  const section = document.createElement('section');
  
  section.id = 'contato';
  section.className = 'contato-section';
  section.innerHTML = `
    <div class="container">
      <h2 class="contact-title">Contato</h2>
      <ul class="contact-list">
        ${contacts.map(c => `<li><a class="contact-link" href="${c.href}" target="_blank" rel="noopener noreferrer"><i class="${c.icon}" aria-hidden="true"></i><span class="contact-name">${c.name}</span></a></li>`).join('')}
      </ul>
      <p class="credits">Desenvolvido por <a href="https://dev.camilaloliveira.me" target="_blank" rel="noopener noreferrer">Camila L. Oliveira</a></p>
    </div>
  `;
  
  const projetos = document.getElementById('projetos');
  if (projetos) projetos.insertAdjacentElement('afterend', section);
  else document.body.appendChild(section);
}