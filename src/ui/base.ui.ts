import { mainData } from '../models/main.model'
import { Main } from '../models/type/main.type.model'

const classes = Main

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  if (className) el.className = className
  if (textContent) el.textContent = textContent
  return el
}

function createAvatar(src: string, alt: string): HTMLImageElement {
  const img = document.createElement('img')
  img.src = src
  img.alt = alt
  img.className = classes.avatar
  return img
}

function createActions(): HTMLDivElement {
  const actions = createElement('div', 'actions')

  const links = [
    { href: '#about', text: 'Sobre Mim', class: 'ghost' },
    { href: '#project', text: 'Projetos', class: 'ghost' },
    { href: '#contact', text: 'Contato', class: 'ghost' },
  ]

  links.forEach(({ href, text, class: btnClass }) => {
    const link = createElement('a', `btn ${btnClass}`, text) as HTMLAnchorElement
    link.href = href
    actions.appendChild(link)
  })

  return actions
}

export function initMainSection() {
  if (document.querySelector(`main.${classes.hero}`)) return

  const main = createElement('main', classes.hero)

  const card = createElement('div', 'card')
  const content = createElement('div', 'card-content')

  const avatar = createAvatar(mainData.avatar, `Foto de ${mainData.name}`)
  const title = createElement('h1', classes.title, mainData.name)
  const subtitle = createElement('h2', classes.subtitle, mainData.role)
  const description = createElement('p', classes.description, mainData.description)
  const actions = createActions()

  content.append(title, subtitle, description, actions)
  card.append(avatar, content)
  main.appendChild(card)

  document.body.prepend(main)
}

export function getThemeColors(): { dark: string; light: string } {
  const styles = getComputedStyle(document.documentElement)
  return {
    dark: styles.getPropertyValue('--text').trim(),
    light: styles.getPropertyValue('--bg1').trim(),
  }
}

