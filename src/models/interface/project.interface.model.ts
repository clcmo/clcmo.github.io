// Definindo a interface do projeto e dados dos projetos
export interface Project {
  slug: string
  title: string
  description: string
  link: string
  tags?: string[]
  image?: string
  faicon?: string
}