import { initMainSection } from './base.ui'
import { initThemeToggle } from './themeToggle.ui'
import { initAboutSection } from './about.ui'
import { initProjects } from './projects.ui'
import { initContactsLinks } from './contacts.ui'

export async function initPage() {
  // 1. Monta a seção principal (hero)
  initMainSection()

  // 2. Adiciona o botão de alternância de tema
  initThemeToggle()

  // 3. Monta a seção de sobre
  initAboutSection()

  // 4. Monta a seção de projetos
  initProjects()

  // 5. Monta a seção de contatos (inclui Pix)
  await initContactsLinks()
}
