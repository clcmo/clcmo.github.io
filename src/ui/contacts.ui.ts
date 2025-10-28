import { contacts } from '../models/contacts.model'
import { Contact } from '../models/interface/contact.interface.model'
import { Section } from '../models/type/section.type.model'
import { createPixListItem } from './pix.ui'

function createContactItem(item: Contact): HTMLLIElement {
  const li = document.createElement('li')
  const link = document.createElement('a')
  link.className = 'contact-link'

  if (item.href) {
    link.href = item.href
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  }

  const icon = document.createElement('i')
  icon.className = item.icon
  icon.setAttribute('aria-hidden', 'true')

  const label = document.createElement('span')
  label.className = 'contact-label'
  label.textContent = item.label

  link.append(icon, label)
  li.appendChild(link)
  return li
}

export async function initContactsLinks() {
  if (document.getElementById(Section.contact)) return

  const section = document.createElement('section')
  section.id = Section.contact
  section.className = `${Section.contact}-section`

  const container = document.createElement('div')
  container.className = 'container'

  const title = document.createElement('h2')
  title.className = `${Section.contact}-title`
  title.textContent = 'Contato'

  const list = document.createElement('ul')
  list.className = `${Section.contact}-list`

  contacts.forEach((item) => {
    if (item.type !== 'pix') {
      list.appendChild(createContactItem(item))
    }
  })

  const pixItem = createPixListItem()
  if (pixItem) list.appendChild(pixItem)

  container.append(title, list)
  section.appendChild(container)

  const projects = document.getElementById(Section.projects)
  if (projects) {
    projects.insertAdjacentElement('afterend', section)
  } else {
    document.body.appendChild(section)
  }
}
