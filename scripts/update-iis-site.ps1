# ========================================
# Script de Atualização IIS - Portal Casa & Terra
# Execute como Administrador
# ========================================

param(
    [string]$SiteName = "Casa Terra Portal",
    [string]$SourcePath = ".\dist",
    [string]$TargetPath = "C:\inetpub\wwwroot\casa-terra-portal"
)

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host " Portal Casa & Terra - Atualização IIS" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está executando como Administrador
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "[ERRO] Este script deve ser executado como Administrador!" -ForegroundColor Red
    Write-Host "Clique com botão direito e selecione 'Executar como Administrador'" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se IIS está instalado
try {
    Import-Module WebAdministration -ErrorAction Stop
    Write-Host "[INFO] Módulo IIS carregado com sucesso" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] IIS não está instalado ou não pode ser carregado!" -ForegroundColor Red
    Write-Host "Por favor, instale o IIS primeiro." -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se pasta source existe
if (-not (Test-Path $SourcePath)) {
    Write-Host "[ERRO] Pasta source não encontrada: $SourcePath" -ForegroundColor Red
    Write-Host "Execute primeiro o build: npm run build" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se site existe
$site = Get-IISSite -Name $SiteName -ErrorAction SilentlyContinue
if (-not $site) {
    Write-Host "[AVISO] Site '$SiteName' não encontrado. Criando..." -ForegroundColor Yellow
    
    # Criar diretório se não existir
    if (-not (Test-Path $TargetPath)) {
        New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
        Write-Host "[INFO] Diretório criado: $TargetPath" -ForegroundColor Green
    }
    
    # Criar site
    try {
        New-IISSite -Name $SiteName -PhysicalPath $TargetPath -Port 80
        Write-Host "[SUCESSO] Site '$SiteName' criado!" -ForegroundColor Green
    } catch {
        Write-Host "[ERRO] Falha ao criar site: $($_.Exception.Message)" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
} else {
    Write-Host "[INFO] Site '$SiteName' encontrado" -ForegroundColor Green
}

# Parar site
Write-Host "[INFO] Parando site..." -ForegroundColor Yellow
try {
    Stop-IISSite -Name $SiteName -Confirm:$false
    Write-Host "[SUCESSO] Site parado" -ForegroundColor Green
} catch {
    Write-Host "[AVISO] Não foi possível parar o site: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Fazer backup
$backupPath = "C:\backups\casa-terra-" + (Get-Date -Format "yyyyMMdd-HHmmss")
Write-Host "[INFO] Fazendo backup para: $backupPath" -ForegroundColor Yellow

try {
    if (Test-Path $TargetPath) {
        New-Item -ItemType Directory -Path "C:\backups" -Force | Out-Null
        Copy-Item $TargetPath $backupPath -Recurse -Force
        Write-Host "[SUCESSO] Backup criado" -ForegroundColor Green
    }
} catch {
    Write-Host "[AVISO] Falha no backup: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Limpar pasta de destino
Write-Host "[INFO] Limpando pasta de destino..." -ForegroundColor Yellow
try {
    if (Test-Path $TargetPath) {
        Remove-Item "$TargetPath\*" -Recurse -Force
    } else {
        New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
    }
    Write-Host "[SUCESSO] Pasta limpa" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Falha ao limpar pasta: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Copiar novos arquivos
Write-Host "[INFO] Copiando novos arquivos..." -ForegroundColor Yellow
try {
    Copy-Item "$SourcePath\*" $TargetPath -Recurse -Force
    Write-Host "[SUCESSO] Arquivos copiados" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Falha ao copiar arquivos: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Configurar permissões
Write-Host "[INFO] Configurando permissões..." -ForegroundColor Yellow
try {
    icacls $TargetPath /grant "IIS_IUSRS:(OI)(CI)RX" /T /Q
    icacls $TargetPath /grant "IUSR:(OI)(CI)RX" /T /Q
    Write-Host "[SUCESSO] Permissões configuradas" -ForegroundColor Green
} catch {
    Write-Host "[AVISO] Falha ao configurar permissões: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Iniciar site
Write-Host "[INFO] Iniciando site..." -ForegroundColor Yellow
try {
    Start-IISSite -Name $SiteName
    Write-Host "[SUCESSO] Site iniciado" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Falha ao iniciar site: $($_.Exception.Message)" -ForegroundColor Red
}

# Verificar status
Start-Sleep -Seconds 2
$siteStatus = (Get-IISSite -Name $SiteName).State
Write-Host "[INFO] Status do site: $siteStatus" -ForegroundColor Cyan

# Testar conectividade
Write-Host "[INFO] Testando conectividade..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "[SUCESSO] Site respondendo corretamente!" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Site respondeu com código: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[AVISO] Não foi possível testar conectividade: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host " ATUALIZAÇÃO CONCLUÍDA!" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Informações:" -ForegroundColor White
Write-Host "   Site: $SiteName" -ForegroundColor Gray
Write-Host "   Caminho: $TargetPath" -ForegroundColor Gray
Write-Host "   Status: $siteStatus" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Acesso:" -ForegroundColor White
Write-Host "   Local: http://localhost" -ForegroundColor Gray
Write-Host "   Rede: http://$env:COMPUTERNAME" -ForegroundColor Gray
Write-Host ""
Write-Host "🔑 Credenciais de teste:" -ForegroundColor White
Write-Host "   Admin: admin@casaterra.com / 123456" -ForegroundColor Gray
Write-Host "   Financeiro: financeiro@casaterra.com / 123456" -ForegroundColor Gray
Write-Host "   RH: rh@casaterra.com / 123456" -ForegroundColor Gray
Write-Host ""

# Perguntar se quer abrir o site
$choice = Read-Host "Deseja abrir o site no navegador? (s/n)"
if ($choice -eq "s" -or $choice -eq "S") {
    Start-Process "http://localhost"
}

Write-Host ""
Write-Host "Pressione Enter para sair..." -ForegroundColor Yellow
Read-Host