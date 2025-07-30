# Guia de Contribuição - Portal Casa & Terra

## 🤝 Como Contribuir

Agradecemos seu interesse em contribuir com o Portal Casa & Terra! Este documento fornece diretrizes para contribuições.

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git
- .NET 8.0 SDK (para backend)
- SQL Server (local ou Docker)

## 🚀 Configuração do Ambiente de Desenvolvimento

### 1. Clone o Repositório
```bash
git clone https://github.com/sua-empresa/casa-terra-portal.git
cd casa-terra-portal
```

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend (.NET Core) - Opcional
```bash
cd backend
dotnet restore
dotnet build
dotnet run --project CasaTerra.Portal.API
```

## 🔄 Fluxo de Trabalho

### 1. Criar Branch
```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 2. Fazer Alterações
- Siga os padrões de código estabelecidos
- Adicione testes quando necessário
- Mantenha commits pequenos e descritivos

### 3. Commit
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

### Padrão de Commits
Utilizamos o padrão Conventional Commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação, sem mudança de código
- `refactor:` refatoração de código
- `test:` adição ou correção de testes
- `chore:` tarefas de manutenção

### 4. Push e Pull Request
```bash
git push origin feature/nome-da-feature
```

Abra um Pull Request no GitHub com:
- Título descritivo
- Descrição detalhada das mudanças
- Screenshots (se aplicável)
- Referência a issues relacionadas

## 🧪 Testes

### Frontend
```bash
npm run test
npm run test:coverage
```

### Backend
```bash
dotnet test
```

## 📝 Padrões de Código

### Frontend (React/TypeScript)
- Use TypeScript para tipagem forte
- Componentes funcionais com hooks
- Nomeação em PascalCase para componentes
- Nomeação em camelCase para funções e variáveis
- Use Tailwind CSS para estilização
- Mantenha componentes pequenos e reutilizáveis

### Backend (.NET Core)
- Siga os princípios SOLID
- Use async/await para operações assíncronas
- Implemente tratamento de erros adequado
- Mantenha controllers enxutos
- Use injeção de dependência

## 🔍 Code Review

Todos os PRs passam por code review. Critérios:

- ✅ Código funciona corretamente
- ✅ Testes passam
- ✅ Segue padrões estabelecidos
- ✅ Documentação atualizada
- ✅ Performance adequada
- ✅ Segurança considerada

## 🐛 Reportar Bugs

Use o template de issue para bugs:

1. Descrição clara do problema
2. Passos para reproduzir
3. Comportamento esperado vs atual
4. Screenshots/logs se aplicável
5. Ambiente (browser, OS, versão)

## 💡 Sugerir Funcionalidades

Use o template de issue para features:

1. Descrição da funcionalidade
2. Justificativa/valor de negócio
3. Mockups/wireframes se aplicável
4. Critérios de aceitação

## 📞 Contato

- Email: dev@casaterra.com
- Slack: #portal-dev
- Teams: Portal Casa & Terra

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.