# 🖥️ Deploy Windows Server IIS - Portal Casa & Terra

Este guia fornece instruções passo-a-passo para publicar o Portal Casa & Terra em Windows Server com IIS.

## 📋 Pré-requisitos no Servidor

### Software Necessário
- **Windows Server 2019/2022** (ou Windows 10/11 Pro)
- **IIS (Internet Information Services)**
- **Node.js 18+** - [Download](https://nodejs.org/)
- **URL Rewrite Module** - [Download](https://www.iis.net/downloads/microsoft/url-rewrite)

### Verificar IIS
1. Abrir **Painel de Controle** → **Programas** → **Ativar recursos do Windows**
2. Marcar **Serviços de Informações da Internet (IIS)**
3. Expandir e marcar:
   - ✅ Serviços da World Wide Web
   - ✅ Recursos de Desenvolvimento de Aplicativos
   - ✅ Recursos HTTP Comuns

## 🚀 Processo de Deploy Simplificado

### Passo 1: Preparar os Arquivos

#### No seu computador de desenvolvimento:

```bash
# 1. Instalar dependências
npm install

# 2. Fazer build para produção
npm run build

# 3. Os arquivos estarão na pasta 'dist'
```

### Passo 2: Transferir Arquivos

1. **Copiar pasta `dist`** para o servidor Windows
2. **Local recomendado**: `C:\inetpub\wwwroot\casa-terra-portal\`
3. **Métodos de transferência**:
   - Pendrive/HD externo
   - Rede compartilhada
   - FTP/SFTP
   - Remote Desktop

### Passo 3: Configurar IIS

#### 3.1 Criar Site no IIS
1. Abrir **Gerenciador do IIS**
2. Clicar com botão direito em **Sites** → **Adicionar Site**
3. Configurar:
   - **Nome do site**: `Casa Terra Portal`
   - **Caminho físico**: `C:\inetpub\wwwroot\casa-terra-portal`
   - **Porta**: `80` (ou `8080` se 80 estiver ocupada)

#### 3.2 Configurar URL Rewrite (IMPORTANTE)
1. Selecionar o site criado
2. Duplo clique em **URL Rewrite**
3. Clicar **Adicionar Regra** → **Regra em Branco**
4. Configurar:
   - **Nome**: `React Router`
   - **Padrão**: `^(.*)$`
   - **Condições**: Adicionar condição
     - **Entrada de condição**: `{REQUEST_FILENAME}`
     - **Verificar se a cadeia de entrada**: `Não é um arquivo`
   - **Ação**:
     - **Tipo de ação**: `Rewrite`
     - **URL de rewrite**: `/index.html`

### Passo 4: Configurar Permissões

1. Clicar com botão direito na pasta do site
2. **Propriedades** → **Segurança**
3. Adicionar permissões para:
   - **IIS_IUSRS**: Leitura e execução
   - **IUSR**: Leitura

### Passo 5: Testar o Site

1. Abrir navegador
2. Acessar: `http://localhost` (ou `http://localhost:8080`)
3. Testar login com credenciais:
   - **Admin**: `admin@casaterra.com` / `123456`
   - **Financeiro**: `financeiro@casaterra.com` / `123456`
   - **RH**: `rh@casaterra.com` / `123456`

## 🔧 Configuração Avançada

### Arquivo web.config (Automático)
O arquivo será criado automaticamente, mas se necessário:

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
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
      <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
    </staticContent>
  </system.webServer>
</configuration>
```

### Configurar HTTPS (Opcional)

1. **Obter certificado SSL**:
   - Let's Encrypt (gratuito)
   - Certificado comercial
   - Certificado auto-assinado (desenvolvimento)

2. **Configurar no IIS**:
   - Selecionar site → **Ligações**
   - **Adicionar** → **https** → **Porta 443**
   - Selecionar certificado SSL

## 🌐 Acesso pela Rede

### Configurar Firewall
```powershell
# Abrir PowerShell como Administrador
New-NetFirewallRule -DisplayName "Casa Terra Portal HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "Casa Terra Portal HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

### Acessar de outros computadores
- **IP do servidor**: `http://192.168.1.100` (exemplo)
- **Nome do servidor**: `http://servidor-casa-terra`

## 🔄 Atualizações Futuras

### Processo Simplificado:
1. Fazer novo build: `npm run build`
2. Parar site no IIS
3. Substituir arquivos na pasta
4. Iniciar site no IIS

### Script de Atualização (PowerShell):
```powershell
# Salvar como update-site.ps1
$siteName = "Casa Terra Portal"
$sourcePath = "C:\temp\casa-terra-build\dist\*"
$targetPath = "C:\inetpub\wwwroot\casa-terra-portal\"

# Parar site
Stop-IISSite -Name $siteName

# Fazer backup
$backupPath = "C:\backups\casa-terra-" + (Get-Date -Format "yyyyMMdd-HHmmss")
Copy-Item $targetPath $backupPath -Recurse

# Atualizar arquivos
Remove-Item "$targetPath*" -Recurse -Force
Copy-Item $sourcePath $targetPath -Recurse

# Iniciar site
Start-IISSite -Name $siteName

Write-Host "Site atualizado com sucesso!"
```

## 🐛 Solução de Problemas

### Problema: Página em branco
**Solução**: Verificar se URL Rewrite está configurado

### Problema: Erro 404 ao navegar
**Solução**: Configurar regra de rewrite para React Router

### Problema: Arquivos CSS/JS não carregam
**Solução**: Verificar MIME types no IIS

### Problema: Acesso negado
**Solução**: Configurar permissões IIS_IUSRS

### Logs do IIS
- **Local**: `C:\inetpub\logs\LogFiles\W3SVC1\`
- **Visualizar**: Bloco de notas ou Log Parser

## 📞 Suporte

Para problemas específicos:
- **Email**: suporte@casaterra.com
- **Documentação**: README.md do projeto
- **Issues**: GitHub do projeto

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0