# Portal Corporativo Casa & Terra

Sistema corporativo moderno e centralizado para acesso a aplicações internas e relatórios, organizado por departamento com controle de permissões integrado ao Active Directory.

## 🌟 Demonstração

**🔗 [Ver Demo Online](https://shiny-profiterole-e00140.netlify.app)**

### Credenciais de Teste:
- **Admin**: `admin@casaterra.com` / `123456`
- **Financeiro**: `financeiro@casaterra.com` / `123456`  
- **RH**: `rh@casaterra.com` / `123456`

## ✨ Características Principais

- 🔐 **Autenticação Segura** - Integração com Active Directory
- 🏢 **21 Departamentos** - Organizados por área de negócio
- 📱 **Design Responsivo** - Funciona em desktop, tablet e mobile
- ⚡ **Performance Otimizada** - Carregamento rápido e interface fluida
- 🎨 **UI/UX Moderna** - Design clean e intuitivo
- 🔒 **Controle de Permissões** - Acesso baseado em grupos AD

## 🏗️ Arquitetura do Projeto

```
casa-terra-portal/
├── frontend/                    # React + TypeScript
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── auth/          # Autenticação
│   │   │   ├── dashboard/     # Dashboard principal
│   │   │   ├── layout/        # Layout e navegação
│   │   │   ├── ui/           # Design System
│   │   │   └── icons/        # Gerenciamento de ícones
│   │   ├── contexts/          # Context API
│   │   ├── data/             # Dados estáticos
│   │   ├── types/            # TypeScript interfaces
│   │   └── App.tsx           # Componente raiz
│   ├── public/               # Assets estáticos
│   └── package.json          # Dependências frontend
│
├── backend/                     # .NET Core API
│   ├── CasaTerra.Portal.API/           # Web API Layer
│   │   ├── Controllers/               # API Controllers
│   │   ├── Middleware/               # Custom middleware
│   │   ├── Configuration/            # Startup configs
│   │   └── Program.cs               # Entry point
│   │
│   ├── CasaTerra.Portal.Core/          # Domain Layer
│   │   ├── Entities/                 # Domain entities
│   │   ├── Interfaces/               # Repository interfaces
│   │   ├── Services/                 # Business logic
│   │   └── DTOs/                    # Data Transfer Objects
│   │
│   ├── CasaTerra.Portal.Infrastructure/ # Infrastructure Layer
│   │   ├── Data/                     # Entity Framework
│   │   ├── Repositories/             # Data access
│   │   ├── Services/                 # External services
│   │   └── ActiveDirectory/          # AD integration
│   │
│   └── CasaTerra.Portal.Tests/         # Unit Tests
│       ├── Controllers/              # Controller tests
│       ├── Services/                 # Service tests
│       └── Integration/              # Integration tests
│
├── docs/                       # Documentação
├── scripts/                    # Scripts de deploy
└── docker-compose.yml          # Containerização
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca JavaScript moderna
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **ESLint** - Linting de código

### Backend (Estrutura Preparada)
- **.NET Core 8.0** - Framework backend
- **ASP.NET Core Web API** - API RESTful
- **Entity Framework Core** - ORM
- **Active Directory Integration** - Autenticação
- **AutoMapper** - Mapeamento de objetos
- **Serilog** - Logging estruturado
- **Swagger/OpenAPI** - Documentação da API

### DevOps & Infraestrutura
- **Docker** - Containerização
- **SQL Server** - Banco de dados
- **IIS** - Servidor web (produção)
- **Git** - Controle de versão

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Frontend (React)
```bash
# Clone o repositório
git clone https://github.com/sua-empresa/casa-terra-portal.git
cd casa-terra-portal

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Backend (.NET Core) - Estrutura Preparada
```bash
cd backend
dotnet restore
dotnet build
dotnet run --project CasaTerra.Portal.API
```

## 🚀 Deploy e Publicação

### Deploy Rápido (Netlify)

1. **Build do projeto**:
   ```bash
   npm run build
   ```

2. **Deploy automático**:
   - Conecte seu repositório GitHub ao Netlify
   - Configure: Build command: `npm run build`, Publish directory: `dist`
   - Deploy automático a cada push na branch main

3. **Deploy manual**:
   ```bash
   # Via Netlify CLI
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

### Outros Métodos de Deploy

- **Vercel**: `vercel --prod`
- **GitHub Pages**: Configure GitHub Actions
- **Docker**: `docker-compose up -d`

📖 **[Guia Completo de Deploy](DEPLOYMENT.md)**

## 🔐 Configuração Active Directory

O sistema está preparado para integração com Active Directory através de:
- Autenticação LDAP
- Grupos de segurança para permissões
- Single Sign-On (SSO)

## 📊 Funcionalidades Implementadas

### ✅ Frontend Completo
- [x] Sistema de autenticação completo
- [x] Dashboard executivo responsivo
- [x] 21 departamentos organizados
- [x] Controle de permissões por usuário
- [x] Interface moderna e intuitiva
- [x] Navegação mobile-friendly
- [x] Gerenciamento de estado com Context API
- [x] Componentes reutilizáveis
- [x] TypeScript para type safety

### 🔄 Backend (Em Desenvolvimento)
- [ ] API Controllers para autenticação
- [ ] Integração com Active Directory
- [ ] Endpoints para departamentos e aplicações
- [ ] Sistema de permissões baseado em grupos AD
- [ ] Logging e monitoramento
- [ ] Testes unitários e integração

## 📁 Estrutura do Projeto

```
casa-terra-portal/
├── src/
│   ├── components/          # Componentes React
│   │   ├── auth/           # Autenticação
│   │   ├── dashboard/      # Dashboard principal
│   │   └── layout/         # Layout e navegação
│   ├── contexts/           # Context API (Estado global)
│   ├── types/              # Definições TypeScript
│   └── App.tsx             # Componente raiz
├── public/                 # Assets estáticos
├── backend/                # API .NET Core (estrutura)
├── docs/                   # Documentação
├── scripts/                # Scripts de deploy
└── docker-compose.yml      # Containerização
```

## 🌐 URLs de Acesso

- **🌐 Produção**: https://shiny-profiterole-e00140.netlify.app
- **💻 Desenvolvimento**: http://localhost:5173
- **🔧 API Backend**: http://localhost:5000 (quando implementado)
- **📚 Swagger UI**: http://localhost:5000/swagger (quando implementado)

## 👥 Departamentos Configurados

1. RH (Recursos Humanos)
2. Jurídico
3. Financeiro
4. Cobrança
5. Administrativo
6. Assessoria Societária
7. Central de Soluções
8. Comercial
9. Contábil
10. Corretores
11. Controle de Vendas
12. Diretoria
13. DM (Desenvolvimento de Mercado)
14. Engenharia
15. Escritório
16. Gestão de Contratos
17. Suprimentos
18. Obras
19. Projetos
20. Regionais
21. Retenção e Quitação

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm run test

# Coverage
npm run test:coverage

# Linting
npm run lint
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

📖 **[Guia de Contribuição](CONTRIBUTING.md)**

## 📄 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Portal Casa & Terra
VITE_ENVIRONMENT=development
```

## 🐳 Docker

```bash
# Desenvolvimento
docker-compose up -d

# Produção
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Próximos Passos

1. Implementar backend .NET Core
2. Configurar integração com Active Directory
3. Desenvolver APIs RESTful
4. Implementar testes automatizados
5. Configurar CI/CD pipeline
6. Deploy em ambiente de produção

## 📞 Suporte e Contato

- **📧 Email**: dev@casaterra.com
- **💬 Issues**: [GitHub Issues](https://github.com/sua-empresa/casa-terra-portal/issues)
- **📖 Documentação**: [Wiki do Projeto](https://github.com/sua-empresa/casa-terra-portal/wiki)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Equipe de desenvolvimento Casa & Terra
- Comunidade React e TypeScript
- Contribuidores do projeto

---

**Desenvolvido com ❤️ pela equipe Casa & Terra**

**Última atualização**: Janeiro 2025 | **Versão**: 1.0.0