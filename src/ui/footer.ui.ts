export async function initFooter() {
    if (document.getElementById('footer')) return;

    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.className = 'site-footer';
    
    const container = document.createElement('div');
    container.className = 'container';
    const copyright = document.createElement('p');
    const year = new Date().getFullYear();

    copyright.textContent = `© ${year} Camila Leite Oliveira. Todos os direitos reservados.`;
    container.appendChild(copyright);
    footer.appendChild(container);
    
    const main = document.querySelector('contact') || document.body;
    main.appendChild(footer);
}