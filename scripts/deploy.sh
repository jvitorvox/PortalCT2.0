#!/bin/bash

# 🚀 Script de Deploy - Portal Casa & Terra
# Este script automatiza o processo de deploy do projeto

set -e  # Parar em caso de erro

echo "🚀 Iniciando deploy do Portal Casa & Terra..."

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

# Verificar ambiente
check_environment() {
    print_status "Verificando ambiente..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js não encontrado!"
        exit 1
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        print_error "npm não encontrado!"
        exit 1
    fi
    
    print_success "Ambiente verificado"
}

# Build do projeto
build_project() {
    print_status "Fazendo build do projeto..."
    
    # Instalar dependências
    npm ci
    
    # Executar linting
    print_status "Executando linting..."
    npm run lint
    
    # Build
    npm run build
    
    print_success "Build concluído com sucesso!"
}

# Deploy para Netlify
deploy_netlify() {
    print_status "Fazendo deploy para Netlify..."
    
    if command -v netlify &> /dev/null; then
        netlify deploy --prod --dir=dist
        print_success "Deploy para Netlify concluído!"
    else
        print_warning "Netlify CLI não encontrado. Instalando..."
        npm install -g netlify-cli
        print_status "Faça login no Netlify:"
        netlify login
        netlify deploy --prod --dir=dist
        print_success "Deploy para Netlify concluído!"
    fi
}

# Deploy para Vercel
deploy_vercel() {
    print_status "Fazendo deploy para Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        print_success "Deploy para Vercel concluído!"
    else
        print_warning "Vercel CLI não encontrado. Instalando..."
        npm install -g vercel
        vercel --prod
        print_success "Deploy para Vercel concluído!"
    fi
}

# Verificar se Docker está instalado
check_docker() {
if ! command -v docker &> /dev/null; then
    print_error "Docker não encontrado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não encontrado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi
}

# Deploy com Docker
deploy_docker() {
    print_status "Fazendo deploy com Docker..."
    
    check_docker

# Parar containers existentes
print_status "Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
read -p "Deseja remover imagens antigas? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down --rmi all
fi

# Build e start dos containers
print_status "Construindo e iniciando containers..."
docker-compose up --build -d

# Verificar status dos containers
print_status "Verificando status dos containers..."
docker-compose ps

# Aguardar inicialização
print_status "Aguardando inicialização dos serviços..."
sleep 30

# Verificar saúde dos serviços
print_status "Verificando saúde dos serviços..."

# Frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Frontend: OK (http://localhost:3000)"
else
    print_error "Frontend: Falha"
fi

# Backend API
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    print_success "Backend API: OK (http://localhost:5000)"
else
    print_warning "Backend API: Não implementado ainda"
fi

# SQL Server
if docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'YourStrong@Passw0rd' -Q "SELECT 1" > /dev/null 2>&1; then
    print_success "SQL Server: OK"
else
    print_warning "SQL Server: Não configurado ainda"
fi

    print_success "Deploy Docker concluído!"
}

# Função principal
main() {
    echo
    print_status "Iniciando processo de deploy..."
    echo
    
    # Verificar ambiente
    check_environment
    
    # Perguntar tipo de deploy
    echo "Escolha o tipo de deploy:"
    echo "1) Build local apenas"
    echo "2) Netlify"
    echo "3) Vercel" 
    echo "4) Docker"
    echo "5) Todos (build + netlify)"
    
    read -p "Digite sua escolha (1-5): " choice
    
    case $choice in
        1)
            build_project
            ;;
        2)
            build_project
            deploy_netlify
            ;;
        3)
            build_project
            deploy_vercel
            ;;
        4)
            deploy_docker
            ;;
        5)
            build_project
            deploy_netlify
            ;;
        *)
            print_error "Opção inválida!"
            exit 1
            ;;
    esac
    
    echo
    print_success "🎉 Deploy concluído com sucesso!"
    echo
    echo "📋 URLs de acesso:"
    echo "   🌐 Produção: https://shiny-profiterole-e00140.netlify.app"
    echo "   💻 Local: http://localhost:5173"
    echo
    echo "🔑 Credenciais de teste:"
    echo "   Admin: admin@casaterra.com / 123456"
    echo "   Financeiro: financeiro@casaterra.com / 123456"
    echo "   RH: rh@casaterra.com / 123456"
    echo
    echo "📝 Para desenvolvimento local:"
    echo "   npm run dev"
    echo
    echo "🛑 Para parar Docker (se usado):"
    echo "   docker-compose down"
    echo
}

# Executar função principal
main "$@"