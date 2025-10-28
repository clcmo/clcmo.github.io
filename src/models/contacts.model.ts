import { contactType as type } from './type/contact.type.model';
import { Contact as data } from './interface/contact.interface.model';

// Inserindo dados reais dos contatos, avançar para o Database depois
export const contacts: data[] = [
  {
    type: type.email,
    label: 'E-mail',
    value: 'milla@apprendendo.blog',
    icon: 'fa-solid fa-envelope',
    href: 'mailto:milla@apprendendo.blog',
  },
  {
    type: type.github,
    label: 'GitHub',
    value: 'github.com/clcmo',
    icon: 'fa-brands fa-github',
    href: 'https://github.com/clcmo',
  },
  {
    type: type.linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/clcmo',
    icon: 'fa-brands fa-linkedin',
    href: 'https://linkedin.com/in/clcmo',
  },
  {
    type: type.pix,
    label: 'Doação via Pix',
    value: 'milla@apprendendo.blog',
    icon: 'fa-solid fa-money-bill-wave',
  },
];