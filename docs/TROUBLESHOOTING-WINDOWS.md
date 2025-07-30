# 🔧 Solução de Problemas - Windows Server IIS

Guia para resolver problemas comuns ao publicar o Portal Casa & Terra em Windows Server com IIS.

## 🚨 Problemas Comuns

### 1. Página em Branco ou Erro 404

**Sintomas:**
- Site carrega mas mostra página em branco
- Erro 404 ao navegar entre páginas
- Console do navegador mostra erros de roteamento

**Causa:** URL Rewrite não configurado ou módulo não instalado

**Solução:**

#### Instalar URL Rewrite Module
1. Download: [URL Rewrite Module 2.1](https://www.iis.net/downloads/microsoft/url-rewrite)
2. Executar instalador como Administrador
3. Reiniciar IIS: `iisreset`

#### Verificar web.config
Arquivo deve estar em `C:\inetpub\wwwroot\casa-terra-portal\web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Router" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### 2. Arquivos CSS/JS Não Carregam

**Sintomas:**
- Site carrega sem estilização
- Console mostra erros 404 para arquivos .css e .js
- Layout quebrado

**Causa:** MIME types não configurados ou permissões incorretas

**Solução:**

#### Configurar MIME Types
1. Abrir **Gerenciador do IIS**
2. Selecionar o site
3. Duplo clique em **MIME Types**
4. Adicionar se não existirem:
   - `.css` → `text/css`
   - `.js` → `application/javascript`
   - `.json` → `application/json`
   - `.woff` → `application/font-woff`
   - `.woff2` → `application/font-woff2`

#### Verificar Permissões
```powershell
# Executar como Administrador
icacls "C:\inetpub\wwwroot\casa-terra-portal" /grant "IIS_IUSRS:(OI)(CI)RX" /T
icacls "C:\inetpub\wwwroot\casa-terra-portal" /grant "IUSR:(OI)(CI)RX" /T
```

### 3. Erro "Cannot GET /"

**Sintomas:**
- Mensagem "Cannot GET /" ao acessar o site
- Erro 500 Internal Server Error

**Causa:** Documento padrão não configurado

**Solução:**
1. Abrir **Gerenciador do IIS**
2. Selecionar o site
3. Duplo clique em **Documento Padrão**
4. Adicionar `index.html` no topo da lista
5. Remover outros documentos padrão se necessário

### 4. Site Não Acessível pela Rede

**Sintomas:**
- Site funciona localmente (localhost)
- Outros computadores não conseguem acessar
- Timeout de conexão

**Solução:**

#### Configurar Firewall
```powershell
# Executar como Administrador
New-NetFirewallRule -DisplayName "Casa Terra Portal HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "Casa Terra Portal HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

#### Verificar Bindings do Site
1. Gerenciador do IIS → Site → **Bindings**
2. Verificar se está configurado para:
   - **IP**: `*` (Todos não atribuídos)
   - **Porta**: `80`
   - **Nome do host**: (deixar vazio)

### 5. Erro de Permissão (403 Forbidden)

**Sintomas:**
- Erro 403 Forbidden
- "You do not have permission to view this directory or page"

**Solução:**

#### Verificar Permissões NTFS
```powershell
# Verificar permissões atuais
icacls "C:\inetpub\wwwroot\casa-terra-portal"

# Corrigir permissões
icacls "C:\inetpub\wwwroot\casa-terra-portal" /reset /T
icacls "C:\inetpub\wwwroot\casa-terra-portal" /grant "IIS_IUSRS:(OI)(CI)RX" /T
icacls "C:\inetpub\wwwroot\casa-terra-portal" /grant "IUSR:(OI)(CI)RX" /T
icacls "C:\inetpub\wwwroot\casa-terra-portal" /grant "Administrators:(OI)(CI)F" /T
```

#### Verificar Autenticação
1. Gerenciador do IIS → Site → **Autenticação**
2. Habilitar **Autenticação Anônima**
3. Desabilitar outras autenticações se não necessárias

### 6. Porta 80 Ocupada

**Sintomas:**
- Erro ao criar site na porta 80
- "Port 80 is already in use"

**Solução:**

#### Verificar Processos na Porta 80
```cmd
netstat -ano | findstr :80
```

#### Usar Porta Alternativa
1. Configurar site na porta 8080
2. Acessar via `http://localhost:8080`
3. Ou parar o serviço que usa porta 80:
   ```powershell
   # Parar IIS padrão se existir
   Stop-Service -Name "W3SVC" -Force
   # Ou parar Skype, Apache, etc.
   ```

### 7. Erro de Módulo Não Encontrado

**Sintomas:**
- "Module not found" no Event Viewer
- Erro 500.19 - Internal Server Error

**Solução:**

#### Instalar Recursos IIS Necessários
```powershell
# Executar como Administrador
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServer
Enable-WindowsOptionalFeature -Online -FeatureName IIS-CommonHttpFeatures
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpErrors
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpRedirect
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ApplicationDevelopment
Enable-WindowsOptionalFeature -Online -FeatureName IIS-NetFxExtensibility45
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HealthAndDiagnostics
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpLogging
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Security
Enable-WindowsOptionalFeature -Online -FeatureName IIS-RequestFiltering
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Performance
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerManagementTools
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ManagementConsole
Enable-WindowsOptionalFeature -Online -FeatureName IIS-IIS6ManagementCompatibility
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Metabase
```

## 🔍 Ferramentas de Diagnóstico

### 1. Event Viewer
- **Local**: `eventvwr.msc`
- **Caminho**: Windows Logs → Application
- **Filtrar**: Source = IIS

### 2. IIS Logs
- **Local**: `C:\inetpub\logs\LogFiles\W3SVC1\`
- **Formato**: W3C Extended Log Format
- **Visualizar**: Notepad++ ou Log Parser

### 3. Failed Request Tracing
1. Gerenciador do IIS → Site → **Failed Request Tracing Rules**
2. Adicionar regra para status 404, 500
3. Logs em: `C:\inetpub\logs\FailedReqLogFiles\`

### 4. Comandos Úteis

```powershell
# Verificar status do IIS
Get-Service W3SVC

# Reiniciar IIS
iisreset

# Verificar sites
Get-IISSite

# Verificar pools de aplicação
Get-IISAppPool

# Testar conectividade
Test-NetConnection -ComputerName localhost -Port 80

# Verificar processos na porta
Get-NetTCPConnection -LocalPort 80
```

## 📋 Checklist de Verificação

### ✅ Pré-requisitos
- [ ] Windows Server com IIS instalado
- [ ] URL Rewrite Module instalado
- [ ] Node.js instalado (para build)
- [ ] Firewall configurado

### ✅ Arquivos
- [ ] Pasta `dist` copiada para servidor
- [ ] Arquivo `web.config` presente
- [ ] Arquivo `index.html` presente
- [ ] Arquivos CSS/JS presentes

### ✅ IIS
- [ ] Site criado no IIS
- [ ] Caminho físico correto
- [ ] Porta configurada (80 ou 8080)
- [ ] Documento padrão: `index.html`
- [ ] URL Rewrite configurado

### ✅ Permissões
- [ ] IIS_IUSRS com permissão de leitura
- [ ] IUSR com permissão de leitura
- [ ] Autenticação anônima habilitada

### ✅ Rede
- [ ] Firewall liberado para porta 80/443
- [ ] Site acessível localmente
- [ ] Site acessível pela rede (se necessário)

## 🆘 Suporte Adicional

### Logs para Análise
Ao solicitar suporte, inclua:
1. **Event Viewer**: Logs de Application e System
2. **IIS Logs**: Últimas entradas dos logs de acesso
3. **Failed Request Tracing**: Se configurado
4. **Screenshot**: Da configuração do site no IIS

### Informações do Sistema
```powershell
# Coletar informações do sistema
systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"
Get-WindowsFeature | Where-Object {$_.Name -like "*IIS*" -and $_.InstallState -eq "Installed"}
```

### Contato
- **Email**: suporte@casaterra.com
- **Documentação**: docs/WINDOWS-IIS-DEPLOY.md
- **GitHub Issues**: Para problemas técnicos

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0