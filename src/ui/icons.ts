document.querySelectorAll<HTMLAnchorElement>('.project-link').forEach((a) => {
  if (!a.querySelector('.fa')) {
    const i = document.createElement('i');
    i.className = 'fa-solid fa-folder-open';
    a.prepend(i);
  }
});
document.querySelectorAll<HTMLAnchorElement>('.contact-link').forEach((a) => {
  if (!a.querySelector('.fa')) {
    const text = (a.textContent || '').toLowerCase();
    const i = document.createElement('i');
    if (text.includes('gravatar')) i.className = 'fa-brands fa-wordpress';
    else if (text.includes('email')) i.className = 'fa-solid fa-envelope';
    else if (text.includes('linkedin')) i.className = 'fa-brands fa-linkedin';
    else if (text.includes('github')) i.className = 'fa-brands fa-github';
    else i.className = 'fa-solid fa-link';
    a.prepend(i);
  }
});