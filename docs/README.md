# Portfolio Website - Camila L. Oliveira

[![GitHub license](https://img.shields.io/github/license/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/blob/main/LICENCE)
[![GitHub stars](https://img.shields.io/github/stars/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/network)
[![GitHub issues](https://img.shields.io/github/issues/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/issues)
[![GitHub donate](https://img.shields.io/github/sponsors/clcmo?color=pink&style=for-the-badge)](https://github.com/sponsors/clcmo)

## 📋 Sobre

Site pessoal e portfólio profissional desenvolvido com TypeScript, CSS moderno, arquitetura MVC e API própria e deployed no GitHub Pages. Este projeto apresenta meus trabalhos, habilidades e experiência como desenvolvedora Android e Full Stack disponíveis no GitHub.

🌐 **[Acesse o site ao vivo](https://dev.camilaloliveira.me/)**

### ✨ Características

- ⚛️ React 18 + TypeScript
- 🎨 Modo claro/escuro (brevemente de volta)
- 💰 Sistema de doação via PIX (brevemente de volta)
- 🔄 Integração com GitHub API (via Railway e Prisma)
- 🗄️ API própria com banco de dados
- 📱 Responsive Design
- 🎯 Arquitetura MVC
- 🚀 Deploy automático via GitHub Actions

## 🏗️ Estrutura do Projeto

```txt
clcmo/
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── models/        # Models (MVC)
│   │   ├── controllers/   # Controllers (MVC)
│   │   ├── views/         # Views/Pages
│   │   ├── services/      # API Services
│   │   ├── hooks/         # Custom Hooks
│   │   ├── contexts/      # React Contexts (Theme, etc)
│   │   ├── styles/        # SCSS/CSS
│   │   └── utils/         # Utilities
│   ├── public/
│   └── package.json
│
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── controllers/   # API Controllers
│   │   ├── models/        # Database Models
│   │   ├── routes/        # API Routes
│   │   ├── services/      # Business Logic
│   │   ├── middlewares/   # Middlewares
│   │   ├── config/        # Configurations
│   │   └── utils/         # Utilities
│   ├── prisma/            # Prisma ORM
│   └── package.json
│
├── shared/                # Código compartilhado
│   └── types/             # TypeScript Types
│
└── docs/                  # Documentação
```

## 🚀 Tecnologias

### Frontend

- React 18
- TypeScript
- SCSS/CSS Modules
- React Router DOM
- Axios
- React Icons
- Framer Motion (animações)

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL / SQLite
- JWT (autenticação)
- Cors
- Dotenv

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.x
- npm ou yarn
- PostgreSQL (ou SQLite para desenvolvimento)

### Setup Frontend

```bash
cd frontend
npm install
npm start
```

### Setup Backend

```bash
cd backend
npm install
npm run prisma:migrate
npm run dev
```

## 🎨 Tema e Estilo

O projeto mantém:

- ✅ Sistema de tema claro/escuro do projeto clcmo.github.io
- ✅ Estilo visual do projeto "old"
- ✅ Funcionalidade PIX
- ✅ Design responsivo

## 🗄️ API Endpoints

### Projetos

```txt
GET    /api/projects              # Lista todos os projetos
GET    /api/projects/:slug        # Busca projeto específico
POST   /api/projects              # Cria novo projeto
PUT    /api/projects/:slug        # Atualiza projeto
DELETE /api/projects/:slug        # Remove projeto
```

### GitHub Integration

```txt
GET    /api/github/repos          # Busca repositórios do GitHub
POST   /api/github/sync           # Sincroniza com GitHub
```

## 🔧 Configuração

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_GITHUB_USERNAME=clcmo
REACT_APP_PIX_KEY=seu-pix-key
```

### Backend (.env)

```env
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
GITHUB_TOKEN=seu_github_token
JWT_SECRET=seu_secret_aqui
NODE_ENV=development
```

## 🚀 Deploy

### Frontend (GitHub Pages)

```bash
cd frontend
npm run build
npm run deploy
```

### Backend (Heroku/Vercel/Railway)

```bash
cd backend
# Seguir instruções específicas da plataforma
```

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 👩‍💻 Autora

**Camila L. Oliveira**

- Website: [dev.camilaloliveira.me](https://dev.camilaloliveira.me)
- GitHub: [@clcmo](https://github.com/clcmo)
- Blog: [apprendendo.blog](https://apprendendo.blog)

---

Feito com ❤️ e ☕
