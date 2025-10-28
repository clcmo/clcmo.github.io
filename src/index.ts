import { initPage } from './ui/init.ui'
import { initFooter } from './ui/footer.ui';

initPage()
initFooter()

document.querySelectorAll<HTMLAnchorElement>('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '#';
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.alert('Seção ' + href + ' ainda não implementada.');
  });
});
