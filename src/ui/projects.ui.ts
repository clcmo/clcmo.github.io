import { Project } from '../models/interface/project.interface.model'
import { projects } from '../models/projects.model'
import { Section } from '../models/type/section.type.model'

function createProjectItem(item: Project): HTMLLIElement {
  const li = document.createElement('li')

  const link = document.createElement('a')
  link.className = 'project-link'
  link.href = item.link
  link.target = '_blank'
  link.rel = 'noopener noreferrer'

  const icon = document.createElement('i')
  icon.className = item.faicon || 'fa-solid fa-folder-open'

  const name = document.createElement('span')
  name.className = 'project-name'
  name.textContent = item.title

  link.append(icon, name)
  li.appendChild(link)
  return li
}

export function initProjects() {
  if (document.getElementById(Section.projects)) return

  const section = document.createElement('section')
  section.id = Section.projects
  section.className = `${Section.projects}-section card`

  const container = document.createElement('div')
  container.className = 'card-content'

  const title = document.createElement('h2')
  title.className = `${Section.projects}-title`
  title.textContent = 'Projetos'

  const description = document.createElement('p')
  description.className = 'project-description'
  description.textContent = 'Aqui estão alguns dos meus projetos recentes que mostram minha paixão por desenvolvimento web.'


  const list = document.createElement('ul')
  list.className = `${Section.projects}-list`

  projects.forEach((project) => {
    list.appendChild(createProjectItem(project))
  })

  container.append(title, description, list)
  section.appendChild(container)

  const main = document.querySelector('main') || document.body
  main.appendChild(section)
}
