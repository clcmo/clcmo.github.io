# Portfolio Website - Camila L. Oliveira

[![GitHub license](https://img.shields.io/github/license/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/blob/main/LICENCE)
[![GitHub stars](https://img.shields.io/github/stars/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/network)
[![GitHub issues](https://img.shields.io/github/issues/clcmo/clcmo.github.io?style=for-the-badge)](https://github.com/clcmo/clcmo.github.io/issues)
[![GitHub donate](https://img.shields.io/github/sponsors/clcmo?color=pink&style=for-the-badge)](https://github.com/sponsors/clcmo)

Site pessoal e portfólio profissional desenvolvido com TypeScript, CSS moderno e deployed no GitHub Pages. Este projeto apresenta meus trabalhos, habilidades e experiência como desenvolvedora Android e Full Stack.

🌐 **[Acesse o site ao vivo](https://dev.camilaloliveira.me/)**

## ✨ Características

- 💼 Design limpo e profissional
- 📱 Totalmente responsivo
- ⚡ Performance otimizada
- 🎨 Interface moderna com CSS customizado
- 🔄 Integração contínua com GitHub Actions
- 📊 Testes automatizados com Jest
- 🚀 Deploy automático no GitHub Pages

## 🛠️ Tecnologias

- **TypeScript** (56.0%) - Tipagem estática e melhor manutenibilidade
- **CSS** (42.4%) - Estilização moderna e responsiva
- **HTML** (1.1%) - Estrutura semântica
- **JavaScript** (0.5%) - Funcionalidades interativas

## 📋 Começando

Siga estas instruções para obter uma cópia do projeto funcionando em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

```bash
node >= 14.x
npm >= 6.x
```

Verifique suas versões:
```bash
node --version
npm --version
```

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/clcmo/clcmo.github.io.git
cd clcmo.github.io
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse no navegador:
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia o servidor de desenvolvimento

# Build
npm run build      # Gera versão de produção otimizada

# Testes
npm test           # Executa testes com Jest
npm run test:watch # Executa testes em modo watch

# Qualidade de Código
npm run lint       # Verifica problemas no código
npm run format     # Formata código automaticamente
```

## 📂 Estrutura do Projeto

```
clcmo.github.io/
├── .github/          # Workflows do GitHub Actions
├── docs/             # Documentação do projeto
├── src/              # Código fonte
│   ├── assets/       # Imagens, fontes, etc.
│   ├── components/   # Componentes reutilizáveis
│   ├── styles/       # Arquivos CSS
│   └── utils/        # Funções auxiliares
├── tests/            # Testes automatizados
├── CNAME             # Configuração do domínio customizado
├── package.json      # Dependências e scripts
└── tsconfig.json     # Configuração TypeScript
```

## 🚀 Deploy

O projeto utiliza GitHub Pages com deploy automático via GitHub Actions. Cada push na branch `main` dispara o workflow de deploy.

### Deploy Manual

Para fazer deploy manualmente:

```bash
npm run build
npm run deploy
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenções de Commit

Este projeto segue [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula faltando, etc
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Atualização de tarefas de build, configs, etc

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENCE) para mais detalhes.

## 👩‍💻 Autora

**Camila L. Oliveira**

- Website: [dev.camilaloliveira.me](https://dev.camilaloliveira.me/)
- GitHub: [@clcmo](https://github.com/clcmo)
- LinkedIn: [Camila L. Oliveira](https://linkedin.com/in/clcmo)
- Ko-fi: [Apoie meu trabalho](https://ko-fi.com/clcmo)

## 🌟 Agradecimentos

- Obrigada a todos que contribuíram com este projeto
- Inspiração de design da comunidade de desenvolvedores
- GitHub Pages por hospedar este site gratuitamente

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela no repositório!

💖 [Apoie este projeto](https://github.com/sponsors/clcmo)
