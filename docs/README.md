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
- 💰 Sistema de doação via PIX
- 🔄 Integração com GitHub API (via Railway, MongoDB e Prisma)
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
- MongoDB / PostgreSQL / SQLite
- JWT (autenticação)
- Cors
- Dotenv

## 📦 Instalação

### Pré-requisitos

- Node.js >= 22.14
- npm ou yarn
- MongoDB Atlas (replica set)

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
npm run db:push
npm run dev
```

## 🎨 Tema e Estilo

O projeto busca manter:

- [ ] Sistema de tema claro/escuro do projeto clcmo.github.io
- [ ] Estilo visual do projeto "old"
- ✅ Funcionalidade PIX
- ✅ Design responsivo

## 🗄️ API Endpoints

### Projetos

```txt
GET    /api/projects              # Lista todos os projetos
GET    /api/projects/:slug        # Busca projeto específico
PUT    /api/projects/:slug        # Atualiza campos editoriais (x-admin-secret)
```

### GitHub Integration

```txt
GET    /api/github/repos          # Lista projetos públicos do MongoDB
GET    /api/github/last-sync      # Última sincronização
POST   /api/github/sync           # Sincroniza GitHub -> MongoDB via Prisma
GET    /health                    # Healthcheck do processo
GET    /ready                     # Readiness com ping no MongoDB
POST   /api/analytics/visit       # Registra visita com IP pseudonimizado
GET    /api/analytics/stats       # Estatísticas (x-admin-secret)
```

## 🔧 Configuração

### Frontend (.env)

```env
EXPO_PUBLIC_API_URL=http://localhost:5555
```

### Backend (.env)

```env
PORT=5555
NODE_ENV=development
ADMIN_SECRET=use-um-segredo-aleatorio-com-ao-menos-16-caracteres
GITHUB_USERNAME=
GITHUB_TOKEN=
DATABASE_URL=
CORS_ORIGINS=
```

## 🚀 Deploy

### Frontend (GitHub Pages)

O workflow `publish.yaml` requer o secret `API_URL`, com a URL base da API sem `/api`. Durante o deploy, a API é consultada para gerar `frontend/public/projects.json`; se a API ou o secret estiverem indisponíveis, o deploy falha. O frontend usa `EXPO_PUBLIC_API_URL` em tempo real e, na web, usa o snapshot quando a API não responde.

### Backend (Heroku/Vercel/Railway)

No Railway, configure:

- **Build:** `npm ci && npm run build --workspace=backend`
- **Pre-deploy:** `npm run db:push --workspace=backend`
- **Start:** `npm run start --workspace=backend`
- **Healthcheck:** `/ready`
- **Variáveis:** `DATABASE_URL` (incluindo o nome do banco), `GITHUB_USERNAME` e `ADMIN_SECRET` (mínimo 16 caracteres).

No GitHub, configure os secrets `API_URL` (URL base, sem `/api`) e `ADMIN_SECRET` (o mesmo valor usado pela API). O workflow `sync-projects.yml` acorda a API, chama `POST /api/github/sync` e dispara uma nova publicação do GitHub Pages. O sync usa Prisma, preserva campos editoriais e despublica projetos indisponíveis sem removê-los do banco.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 👩🏻‍🦰👩‍💻 Autora: Camila L. Oliveira

- Website: [dev.camilaloliveira.com](https://dev.camilaloliveira.com)
- GitHub: [@clcmo](https://github.com/clcmo)
- Blog: [apprendendo.blog](https://apprendendo.blog)

---

Feito com ❤️ e ☕
