export function initThemeToggle() {
  const card = document.querySelector('.card')
  if (!card || document.querySelector('.theme-toggle')) return

  const btn = document.createElement('button')
  btn.className = 'theme-toggle'
  btn.setAttribute('aria-label', 'Alternar tema')

  const icon = document.createElement('i')
  const saved = localStorage.getItem('site-theme')
  const isLight = saved === 'light'
  icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
  btn.appendChild(icon)

  btn.addEventListener('click', () => {
    const root = document.documentElement
    const light = root.getAttribute('data-theme') === 'light'
    root.setAttribute('data-theme', light ? '' : 'light')
    localStorage.setItem('site-theme', light ? 'dark' : 'light')
    icon.className = light ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
  })

  card.appendChild(btn)
}
