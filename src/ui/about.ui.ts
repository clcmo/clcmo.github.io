import { Section } from '../models/type/section.type.model'

function createParagraphs(): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'about-paragraphs'

  const paragraphs = [
    'Trabalho com desenvolvimento desde 2019, desenvolvi funcionalidades para o Itaú e PagBank. Em equipe, também ajudei a elaborar soluções para e-commerce, educação financeira, pagamentos, comunicação e insights. Fui premiada com o segundo lugar no HackaPag, em junho de 2022, com um projeto focado em educação financeira.',
    'Sou pós-graduada em Inteligência Artificial pelo TIDD da PUC-SP, com o artigo “Consumismo, Moralidade e Excessos da Sociedade Digitalizada”. Desde 2021, venho pesquisando sobre o futuro da sociedade com a internet das coisas e o advento da inteligência artificial – o que pretendo fazer em um mestrado.',
    'Sou formada em Análise e Desenvolvimento de Sistemas pela FATEC-SP e em Administração Pública pela UFOP.',
    'Também tenho conhecimento em dois idiomas: Inglês e Francês, e tenho como objetivo, além de continuar me aperfeiçoando, poder ensinar pessoas curiosas e dispostas a conhecer essa área tão rica que é a tecnologia.',
  ]

  paragraphs.forEach((text) => {
    const p = document.createElement('p')
    p.textContent = text
    wrapper.appendChild(p)
  })

  return wrapper
}

export function initAboutSection() {
  if (document.getElementById(Section.about)) return

  const section = document.createElement('section')
  section.id = Section.about
  section.className = `${Section.about}-section`

  const container = document.createElement('div')
  container.className = 'container'

  const content = document.createElement('div')
  content.className = 'card-content'

  const title = document.createElement('h2')
  title.className = `${Section.about}-title`
  title.textContent = 'Sobre Mim'

  const paragraphs = createParagraphs()

  content.append(title, paragraphs)
  container.appendChild(content)
  section.appendChild(container)

  const main = document.querySelector('main') || document.body
  main.appendChild(section)
}
