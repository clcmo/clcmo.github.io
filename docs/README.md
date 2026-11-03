# Portfolio Website - Camila L. Oliveira

[![GitHub license](https://img.shields.io/github/license/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/blob/main/LICENCE)
[![GitHub stars](https://img.shields.io/github/stars/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/network)
[![GitHub issues](https://img.shields.io/github/issues/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/issues)
[![GitHub donate](https://img.shields.io/github/sponsors/clcmo?color=pink&style=for-the-badge)](https://github.com/sponsors/clcmo)

## 📋 Sobre

Site pessoal e portfólio profissional desenvolvido com TypeScript, CSS moderno, arquitetura MVC e API própria e deployed no GitHub Pages. Este projeto apresenta meus trabalhos, habilidades e experiência como desenvolvedora Android e Full Stack disponíveis no GitHub.

🌐 **[Acesse o site ao vivo](https://dev.camilaloliveira.com/)**

### ✨ Características

- ⚛️ React 18 + TypeScript
- 🎨 Modo claro/escuro (brevemente de volta)
- 💰 Sistema de doação via PIX
- 🔄 Projetos públicos obtidos pela GitHub API e publicados como snapshot estático
- 🗄️ API opcional para recursos que precisam de backend
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
EXPO_PUBLIC_API_URL=http://localhost:5556
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

O workflow `publish.yaml` consulta os repositórios públicos do GitHub, combina os dados com `frontend/data/project-curation.json`, gera `frontend/public/projects.json` e publica o site. Ele roda a cada seis horas, em pushes para `main` ou manualmente. Não requer `API_URL`, MongoDB ou serviço de backend para exibir os projetos no site.

Para gerar o snapshot localmente, use `GITHUB_TOKEN` opcional para aumentar a cota da API:

```bash
GITHUB_USERNAME=clcmo node scripts/generate-projects-snapshot.mjs
```

Edite `frontend/data/project-curation.json` para ocultar projetos ou configurar `featured`, `coverUrl` e `category`. As chaves são os nomes completos no GitHub (`usuario/repositorio`). O frontend web lê o snapshot estático; builds nativos continuam usando `EXPO_PUBLIC_API_URL`.

### Backend (Heroku/Vercel/Railway)

No Railway, configure:

- **Build:** `npm ci && npm run build --workspace=backend`
- **Pre-deploy:** `npm run db:push --workspace=backend`
- **Start:** `npm run start --workspace=backend`
- **Healthcheck:** `/ready`
- **Variáveis:** `DATABASE_URL` (incluindo o nome do banco), `GITHUB_USERNAME` e `ADMIN_SECRET` (mínimo 16 caracteres).

O backend continua podendo ser usado por funcionalidades nativas e analytics. A publicação do GitHub Pages e a atualização dos cards web não dependem de secrets `API_URL` ou `ADMIN_SECRET`. Sem uma API configurada no build, o registro de analytics fica desativado na web.

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
