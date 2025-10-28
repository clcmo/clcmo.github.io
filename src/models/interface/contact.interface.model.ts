import { contactType } from '../type/contact.type.model';

// Definindo a interface do contato e dados dos contatos
export interface Contact {
  type: contactType
  label: string
  value: string
  icon: string
  href?: string
  nome?: string
  cidade?: string
  valor?: string
}