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
    },
    {
        slug: 'rapida',
        title: 'Rápida',
        description: 'Um serviço de gerenciamento escolar rápido e eficiente.',
        link: 'https://github.com/clcmo/Rapida',
        tags: ['educação', 'gerenciamento escolar'],
        image: '',
        faicon: 'fa-solid fa-school'
    },
    {
        slug: 'walking',
        title: 'Walking',
        description: 'Um aplicativo, feito em Java, para monitorar caminhadas e atividades físicas.',
        link: '#',
        tags: ['saúde', 'fitness', 'aplicativo', 'java'],
        image: '',
        faicon: 'fa-solid fa-walking'
    },
    {
        slug: 'meu-primeiro-projeto',
        title: 'MeuPrimeiroProjeto',
        description: 'Repositório educacional ensinando os conceitos iniciais sobre Git.',
        link: 'https://github.com/Apprendendo/MeuPrimeiroProjeto',
        tags: ['educação', 'git', 'tutorial'],
        image: '',
        faicon: 'fa-brands fa-git-alt'
    },
    {
        slug: 'pygame',
        title: 'PyGame - Jogo Python',
        description: 'Um jogo Python criado com PgZero (Pygame Zero) usando arquitetura MVC. Apresenta sistema de menu funcional, personagem herói, inimigos com mecânica de patrulha e batalha.',
        link: 'https://github.com/clcmo/pygame',
        tags: ['python', 'game', 'pygame', 'mvc'],
        image: '',
        faicon: 'fa-solid fa-gamepad'
    },
    {
        slug: 'miext',
        title: 'MiExt',
        description: 'Extensão para navegadores que permite salvar conteúdos do site camilaloliveira.com para ler depois em um popup conveniente.',
        link: 'https://github.com/clcmo/MiExt',
        tags: ['javascript', 'browser-extension', 'productivity'],
        image: '',
        faicon: 'fa-solid fa-puzzle-piece'
    },
    {
        slug: 'docker-php',
        title: 'Docker com Site PHP',
        description: 'Aula de conexão do PHP através de um container Docker.',
        link: 'https://github.com/BartoInfo/dockercomsitePHP',
        tags: ['php', 'docker', 'educação'],
        image: '',
        faicon: 'fa-brands fa-docker'
    },
    {
        slug: 'studio-urbanna',
        title: 'Studio Urbanna',
        description: 'Site da @studiourbanna, criada em Jekyll e baseada no tema Mundana. Compartilha lições sobre criação de websites e ciclo de vida do Android.',
        link: 'https://studiourbanna.github.io',
        tags: ['jekyll', 'blog', 'css', 'tutorial'],
        image: '',
        faicon: 'fa-solid fa-palette'
    },
    {
        slug: 'clcmo-profile',
        title: 'Perfil GitHub',
        description: 'Perfil personalizado feito em Markdown para o GitHub.',
        link: 'https://github.com/clcmo/clcmo',
        tags: ['markdown', 'profile', 'github'],
        image: '',
        faicon: 'fa-brands fa-github'
    },
    {
        slug: 'uapp',
        title: 'uApp',
        description: 'Aplicativo Android com integração Firebase.',
        link: 'https://github.com/clcmo/uApp',
        tags: ['android', 'firebase', 'mobile'],
        image: '',
        faicon: 'fa-brands fa-android'
    }
];