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

## 🖥️ Deploy Windows Server IIS (Recomendado)

### 🚀 Processo Super Simples

#### 1. **No seu computador de desenvolvimento:**
```bash
# Execute o script automatizado
scripts\build-for-windows.bat
```

#### 2. **Copie a pasta `dist` para o servidor Windows**
- Local recomendado: `C:\inetpub\wwwroot\casa-terra-portal\`

#### 3. **No servidor, execute como Administrador:**
```bash
# Na pasta copiada, execute:
instalar-no-servidor.bat
```

### 📖 Documentação Completa
- **[Guia Windows IIS](docs/WINDOWS-IIS-DEPLOY.md)** - Instruções detalhadas
- **[Solução de Problemas](docs/TROUBLESHOOTING-WINDOWS.md)** - Troubleshooting
- **[Guia de Setup](docs/SETUP.md)** - Configuração de desenvolvimento

## 🏗️ Arquitetura do Projeto

```
casa-terra-portal/
├── src/                        # Frontend React + TypeScript
│   ├── components/             # Componentes React
│   │   ├── auth/              # Autenticação
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── layout/            # Layout e navegação
│   │   └── ui/               # Design System
│   ├── contexts/              # Context API
│   ├── types/                 # TypeScript interfaces
│   └── App.tsx               # Componente raiz
├── backend/                    # .NET Core API (estrutura preparada)
│   ├── CasaTerra.Portal.API/          # Web API Layer
│   ├── CasaTerra.Portal.Core/         # Domain Layer
│   └── CasaTerra.Portal.Infrastructure/ # Infrastructure Layer
├── docs/                       # Documentação completa
├── scripts/                    # Scripts de deploy Windows
└── docker-compose.yml          # Containerização (opcional)
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

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Desenvolvimento Local
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

## 🌐 URLs de Acesso

- **🌐 Produção**: https://shiny-profiterole-e00140.netlify.app
- **💻 Desenvolvimento**: http://localhost:5173
- **🔧 API Backend**: http://localhost:5000 (quando implementado)
- **📚 Swagger UI**: http://localhost:5000/swagger (quando implementado)

## 👥 Departamentos Configurados

1. **RH** (Recursos Humanos)
2. **Jurídico**
3. **Financeiro**
4. **Cobrança**
5. **Administrativo**
6. **Assessoria Societária**
7. **Central de Soluções**
8. **Comercial**
9. **Contábil**
10. **Corretores**
11. **Controle de Vendas**
12. **Diretoria**
13. **DM** (Desenvolvimento de Mercado)
14. **Engenharia**
15. **Escritório**
16. **Gestão de Contratos**
17. **Suprimentos**
18. **Obras**
19. **Projetos**
20. **Regionais**
21. **Retenção e Quitação**

## 📄 Scripts Disponíveis

```bash
npm run dev                    # Servidor de desenvolvimento
npm run build                 # Build para produção
npm run build:windows         # Build otimizado para Windows IIS
npm run preview               # Preview do build
npm run lint                  # Verificar código
npm run deploy:windows        # Deploy automático no Windows IIS
```

## 🧪 Funcionalidades Implementadas

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

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Portal Casa & Terra
VITE_ENVIRONMENT=development
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

📖 **[Guia de Contribuição](CONTRIBUTING.md)**

## 📝 Próximos Passos

1. ✅ Frontend React completo
2. ✅ Deploy em Windows IIS
3. ✅ Documentação completa
4. [ ] Implementar backend .NET Core
5. [ ] Configurar integração com Active Directory
6. [ ] Desenvolver APIs RESTful
7. [ ] Implementar testes automatizados
8. [ ] Configurar CI/CD pipeline

## 📞 Suporte e Contato

- **📧 Email**: dev@casaterra.com
- **💬 Issues**: [GitHub Issues](https://github.com/sua-empresa/casa-terra-portal/issues)
- **📖 Documentação**: Pasta `docs/` do projeto

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Equipe de desenvolvimento Casa & Terra
- Comunidade React e TypeScript
- Contribuidores do projeto

---

**Desenvolvido com ❤️ pela equipe Casa & Terra**

**Última atualização**: Janeiro 2025 | **Versão**: 1.0.0