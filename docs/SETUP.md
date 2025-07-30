# 🛠️ Guia de Configuração - Portal Casa & Terra

Este documento fornece instruções detalhadas para configurar o ambiente de desenvolvimento do Portal Casa & Terra.

## 📋 Pré-requisitos

### Software Necessário

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recomendado) - [Download](https://code.visualstudio.com/)

### Extensões VS Code Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

## 🚀 Configuração Inicial

### 1. Clone do Repositório

```bash
# HTTPS
git clone https://github.com/sua-empresa/casa-terra-portal.git

# SSH (recomendado)
git clone git@github.com:sua-empresa/casa-terra-portal.git

cd casa-terra-portal
```

### 2. Instalação de Dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### 3. Configuração de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar variáveis conforme necessário
nano .env
```

### 4. Verificar Instalação

```bash
# Executar em modo desenvolvimento
npm run dev

# Verificar se está rodando em http://localhost:5173
```

## ⚙️ Configurações Detalhadas

### Variáveis de Ambiente

Edite o arquivo `.env` com suas configurações:

```env
# Básico
VITE_APP_NAME=Portal Casa & Terra
VITE_ENVIRONMENT=development

# API (quando backend estiver pronto)
VITE_API_URL=http://localhost:5000/api

# Features
VITE_ENABLE_MOCK_AUTH=true
VITE_ENABLE_DEBUG=true
```

### Configuração do Git

```bash
# Configurar informações do usuário
git config user.name "Seu Nome"
git config user.email "seu.email@casaterra.com"

# Configurar editor padrão
git config core.editor "code --wait"

# Configurar linha de comando
git config init.defaultBranch main
```

### Configuração do VS Code

Crie `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["className\\s*=\\s*[\"']([^\"']*)[\"']", "([a-zA-Z0-9\\-:]+)"]
  ]
}
```

## 🔧 Ferramentas de Desenvolvimento

### ESLint

Configuração já incluída no projeto. Para executar:

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint -- --fix
```

### Prettier

Configuração automática via VS Code. Para formatar manualmente:

```bash
# Instalar globalmente (opcional)
npm install -g prettier

# Formatar arquivos
prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
```

### TypeScript

Verificar tipos:

```bash
# Verificar tipos sem compilar
npx tsc --noEmit

# Modo watch
npx tsc --noEmit --watch
```

## 🐳 Configuração Docker (Opcional)

### Desenvolvimento com Docker

```bash
# Build da imagem
docker build -t casa-terra-portal .

# Executar container
docker run -p 5173:5173 casa-terra-portal

# Ou usar Docker Compose
docker-compose up -d
```

### Docker Compose

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

## 🧪 Configuração de Testes (Futuro)

### Jest + React Testing Library

```bash
# Instalar dependências de teste
npm install -D jest @testing-library/react @testing-library/jest-dom

# Configurar Jest
npm install -D @types/jest jest-environment-jsdom
```

### Cypress (E2E)

```bash
# Instalar Cypress
npm install -D cypress

# Abrir Cypress
npx cypress open
```

## 📱 Configuração Mobile (Futuro)

### React Native

```bash
# Instalar React Native CLI
npm install -g @react-native-community/cli

# Criar projeto mobile
npx react-native init CasaTerraPortalMobile
```

## 🔍 Debugging

### VS Code Debugger

Configuração `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### React Developer Tools

1. Instalar extensão do Chrome/Firefox
2. Abrir DevTools
3. Aba "Components" e "Profiler"

### Redux DevTools (se usar Redux)

```bash
npm install -D @reduxjs/toolkit react-redux
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Porta 5173 ocupada**
   ```bash
   # Usar porta diferente
   npm run dev -- --port 3000
   ```

2. **Erro de permissão no npm**
   ```bash
   # Configurar npm para usuário atual
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```

3. **Cache do npm corrompido**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Problemas com TypeScript**
   ```bash
   # Reiniciar TypeScript server no VS Code
   Ctrl+Shift+P > "TypeScript: Restart TS Server"
   ```

### Logs e Debugging

```bash
# Logs detalhados do Vite
npm run dev -- --debug

# Logs do npm
npm run dev --verbose

# Verificar versões
node --version
npm --version
```

## 📚 Recursos Úteis

### Documentação

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

### Comunidade

- [React Brasil](https://react.dev.br/)
- [TypeScript Brasil](https://github.com/typescript-brasil)
- [Discord Casa & Terra Dev](https://discord.gg/casaterra)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique este guia
2. Consulte [Issues do GitHub](https://github.com/sua-empresa/casa-terra-portal/issues)
3. Entre em contato: dev@casaterra.com
4. Slack: #portal-dev

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0