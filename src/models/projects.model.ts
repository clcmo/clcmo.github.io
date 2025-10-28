import { Project as data } from './interface/project.interface.model';

// Inserindo dados reais dos projetos, avançar para o Database depois

export const projects: data[] = [
    {
        slug: 'bartoinfo',
        title: 'BartoInfo',
        description: 'Um projeto de evento sobre tecnologia, programação e desenvolvimento web.',
        link: 'https://bartoinfo.github.io',
        tags: ['blog', 'tecnologia', 'programação'],
        image: 'https://bartoinfo.github.io/assets/images/logo.png',
        faicon: 'fa-solid fa-computer'
    },
    {
        slug: 'apprendendo',
        title: 'Apprendendo',
        description: 'Um blog dedicado a compartilhar conhecimentos e experiências de aprendizado.',
        link: 'https://apprendendo.blog',
        tags: ['blog', 'educação', 'aprendizado'],
        image: 'https://apprendendo.blog/assets/images/logo.png',
        faicon: 'fa-solid fa-book-open'
    },
    {
        slug: 're_ciclo',
        title: 'Re_ciclo',
        description: 'Um projeto focado em sustentabilidade e reciclagem.',
        link: '#',
        tags: ['sustentabilidade', 'reciclagem'],
        image: '',
        faicon: 'fa-solid fa-recycle'
    }
];