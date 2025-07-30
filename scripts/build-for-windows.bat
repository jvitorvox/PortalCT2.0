@echo off
REM ========================================
REM Script de Build para Windows Server IIS
REM Portal Casa & Terra
REM ========================================

echo.
echo ==========================================
echo  Portal Casa & Terra - Build para IIS
echo ==========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale Node.js 18+ primeiro.
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js encontrado: 
node --version

REM Verificar se npm está disponível
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] npm nao encontrado!
    pause
    exit /b 1
)

echo [INFO] npm encontrado: 
npm --version
echo.

REM Instalar dependências
echo [INFO] Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo [SUCESSO] Dependencias instaladas!
echo.

REM Executar linting
echo [INFO] Verificando qualidade do codigo...
call npm run lint
if %errorlevel% neq 0 (
    echo [AVISO] Problemas encontrados no linting
    echo Continuando com o build...
)

echo.

REM Fazer build para produção
echo [INFO] Fazendo build para producao...
call npm run build
if %errorlevel% neq 0 (
    echo [ERRO] Falha no build!
    pause
    exit /b 1
)

echo [SUCESSO] Build concluido!
echo.

REM Verificar se pasta dist foi criada
if not exist "dist" (
    echo [ERRO] Pasta 'dist' nao foi criada!
    pause
    exit /b 1
)

echo [INFO] Arquivos gerados na pasta 'dist':
dir dist /b
echo.

REM Criar arquivo web.config para IIS
echo [INFO] Criando arquivo web.config para IIS...
(
echo ^<?xml version="1.0" encoding="UTF-8"?^>
echo ^<configuration^>
echo   ^<system.webServer^>
echo     ^<rewrite^>
echo       ^<rules^>
echo         ^<rule name="React Router" stopProcessing="true"^>
echo           ^<match url="^^(.*)$" /^>
echo           ^<conditions logicalGrouping="MatchAll"^>
echo             ^<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /^>
echo             ^<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /^>
echo           ^</conditions^>
echo           ^<action type="Rewrite" url="/index.html" /^>
echo         ^</rule^>
echo       ^</rules^>
echo     ^</rewrite^>
echo     ^<staticContent^>
echo       ^<mimeMap fileExtension=".json" mimeType="application/json" /^>
echo       ^<mimeMap fileExtension=".woff" mimeType="application/font-woff" /^>
echo       ^<mimeMap fileExtension=".woff2" mimeType="application/font-woff2" /^>
echo     ^</staticContent^>
echo     ^<httpErrors errorMode="Custom" existingResponse="Replace"^>
echo       ^<remove statusCode="404" subStatusCode="-1" /^>
echo       ^<error statusCode="404" path="/index.html" responseMode="ExecuteURL" /^>
echo     ^</httpErrors^>
echo   ^</system.webServer^>
echo ^</configuration^>
) > dist\web.config

echo [SUCESSO] Arquivo web.config criado!
echo.

REM Criar arquivo de instruções
echo [INFO] Criando arquivo de instrucoes...
(
echo ==========================================
echo  INSTRUCOES DE DEPLOY - Portal Casa Terra
echo ==========================================
echo.
echo 1. Copie toda a pasta 'dist' para o servidor Windows
echo.
echo 2. Local recomendado no servidor:
echo    C:\inetpub\wwwroot\casa-terra-portal\
echo.
echo 3. Configure o IIS:
echo    - Criar novo site apontando para a pasta
echo    - Instalar URL Rewrite Module se necessario
echo    - Configurar permissoes IIS_IUSRS
echo.
echo 4. Testar acesso:
echo    http://localhost
echo.
echo 5. Credenciais de teste:
echo    Admin: admin@casaterra.com / 123456
echo    Financeiro: financeiro@casaterra.com / 123456
echo    RH: rh@casaterra.com / 123456
echo.
echo Para mais detalhes, consulte:
echo docs\WINDOWS-IIS-DEPLOY.md
echo.
) > dist\INSTRUCOES-DEPLOY.txt

echo [SUCESSO] Arquivo de instrucoes criado!
echo.

REM Criar script de instalação para o servidor
echo [INFO] Criando script de instalacao para o servidor...
(
echo @echo off
echo REM Script de instalacao no servidor Windows
echo REM Execute como Administrador
echo.
echo echo Configurando Portal Casa Terra no IIS...
echo.
echo REM Importar modulo WebAdministration
echo powershell -Command "Import-Module WebAdministration"
echo.
echo REM Criar site no IIS
echo powershell -Command "New-IISSite -Name 'Casa Terra Portal' -PhysicalPath '%~dp0' -Port 80"
echo.
echo REM Configurar permissoes
echo icacls "%~dp0" /grant "IIS_IUSRS:(OI)(CI)RX" /T
echo icacls "%~dp0" /grant "IUSR:(OI)(CI)RX" /T
echo.
echo echo Site configurado com sucesso!
echo echo Acesse: http://localhost
echo pause
) > dist\instalar-no-servidor.bat

echo [SUCESSO] Script de instalacao criado!
echo.

REM Mostrar resumo
echo ==========================================
echo  BUILD CONCLUIDO COM SUCESSO!
echo ==========================================
echo.
echo Arquivos prontos para deploy na pasta 'dist'
echo.
echo Proximos passos:
echo 1. Copie a pasta 'dist' para o servidor Windows
echo 2. Execute 'instalar-no-servidor.bat' como Administrador
echo 3. Ou siga as instrucoes em 'INSTRUCOES-DEPLOY.txt'
echo.
echo Documentacao completa:
echo docs\WINDOWS-IIS-DEPLOY.md
echo.

REM Perguntar se quer abrir a pasta
set /p choice="Deseja abrir a pasta 'dist'? (s/n): "
if /i "%choice%"=="s" (
    start explorer dist
)

echo.
echo Pressione qualquer tecla para sair...
pause >nul