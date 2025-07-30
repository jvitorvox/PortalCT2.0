#!/bin/bash

# 🛠️ Script de Setup - Portal Casa & Terra
# Este script automatiza a configuração inicial do projeto

set -e  # Parar em caso de erro

echo "🚀 Configurando Portal Casa & Terra..."
echo "======================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Node.js está instalado
check_node() {
    print_status "Verificando Node.js..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js encontrado: $NODE_VERSION"
        
        # Verificar se é versão 18+
        NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR" -lt 18 ]; then
            print_error "Node.js 18+ é necessário. Versão atual: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
        echo "Download: https://nodejs.org/"
        exit 1
    fi
}

# Verificar se npm está instalado
check_npm() {
    print_status "Verificando npm..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm encontrado: $NPM_VERSION"
    else
        print_error "npm não encontrado. Por favor, instale npm primeiro."
        exit 1
    fi
}

# Verificar se Git está instalado
check_git() {
    print_status "Verificando Git..."
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version)
        print_success "Git encontrado: $GIT_VERSION"
    else
        print_error "Git não encontrado. Por favor, instale Git primeiro."
        echo "Download: https://git-scm.com/"
        exit 1
    fi
}

# Instalar dependências
install_dependencies() {
    print_status "Instalando dependências do projeto..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    print_success "Dependências instaladas com sucesso!"
}

# Configurar arquivo de ambiente
setup_env() {
    print_status "Configurando arquivo de ambiente..."
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_success "Arquivo .env criado a partir do .env.example"
        else
            print_warning "Arquivo .env.example não encontrado. Criando .env básico..."
            cat > .env << EOF
VITE_APP_NAME=Portal Casa & Terra
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_MOCK_AUTH=true
VITE_ENABLE_DEBUG=true
EOF
            print_success "Arquivo .env básico criado"
        fi
    else
        print_warning "Arquivo .env já existe. Pulando..."
    fi
}

# Configurar Git hooks (se disponível)
setup_git_hooks() {
    print_status "Configurando Git hooks..."
    
    if [ -d ".git" ]; then
        # Pre-commit hook para executar linting
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Executando linting antes do commit..."
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting falhou. Commit cancelado."
    exit 1
fi
EOF
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks configurados"
    else
        print_warning "Não é um repositório Git. Pulando configuração de hooks..."
    fi
}

# Verificar se o projeto funciona
test_project() {
    print_status "Testando se o projeto funciona..."
    
    # Build de teste
    npm run build > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_success "Build de teste executado com sucesso!"
    else
        print_error "Build de teste falhou. Verifique as configurações."
        exit 1
    fi
    
    # Linting
    npm run lint > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_success "Linting passou sem problemas!"
    else
        print_warning "Linting encontrou problemas. Execute 'npm run lint' para detalhes."
    fi
}

# Criar estrutura de pastas se necessário
create_folders() {
    print_status "Verificando estrutura de pastas..."
    
    FOLDERS=(
        "src/components/ui"
        "src/services"
        "src/utils"
        "src/hooks"
        "src/types"
        "public/images"
        "docs"
    )
    
    for folder in "${FOLDERS[@]}"; do
        if [ ! -d "$folder" ]; then
            mkdir -p "$folder"
            print_success "Pasta criada: $folder"
        fi
    done
}

# Configurar VS Code (se disponível)
setup_vscode() {
    print_status "Configurando VS Code..."
    
    if command -v code &> /dev/null; then
        # Criar pasta .vscode se não existir
        mkdir -p .vscode
        
        # Configurações recomendadas
        if [ ! -f ".vscode/settings.json" ]; then
            cat > .vscode/settings.json << 'EOF'
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
  }
}
EOF
            print_success "Configurações do VS Code criadas"
        fi
        
        # Extensões recomendadas
        if [ ! -f ".vscode/extensions.json" ]; then
            cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
EOF
            print_success "Lista de extensões recomendadas criada"
        fi
    else
        print_warning "VS Code não encontrado. Pulando configuração..."
    fi
}

# Função principal
main() {
    echo
    print_status "Iniciando configuração do Portal Casa & Terra..."
    echo
    
    # Verificações
    check_node
    check_npm
    check_git
    
    echo
    print_status "Pré-requisitos verificados com sucesso!"
    echo
    
    # Configurações
    install_dependencies
    setup_env
    create_folders
    setup_git_hooks
    setup_vscode
    test_project
    
    echo
    print_success "🎉 Configuração concluída com sucesso!"
    echo
    echo "📋 Próximos passos:"
    echo "   1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento"
    echo "   2. Abra http://localhost:5173 no seu navegador"
    echo "   3. Faça login com as credenciais de teste:"
    echo "      - admin@casaterra.com / 123456"
    echo "      - financeiro@casaterra.com / 123456"
    echo "      - rh@casaterra.com / 123456"
    echo
    echo "📚 Documentação:"
    echo "   - README.md - Visão geral do projeto"
    echo "   - docs/SETUP.md - Guia detalhado de configuração"
    echo "   - CONTRIBUTING.md - Como contribuir"
    echo "   - DEPLOYMENT.md - Como fazer deploy"
    echo
    echo "🆘 Suporte:"
    echo "   - Issues: https://github.com/sua-empresa/casa-terra-portal/issues"
    echo "   - Email: dev@casaterra.com"
    echo
}

# Executar função principal
main "$@"