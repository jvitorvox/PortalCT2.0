# 🚀 Guia de Deploy - Portal Casa & Terra

Este documento fornece instruções detalhadas para fazer deploy do Portal Casa & Terra em diferentes ambientes.

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git
- Conta no Netlify (para frontend)
- Servidor com .NET 8.0 (para backend)
- SQL Server (para produção)

## 🌐 Deploy do Frontend (Netlify)

### Método 1: Deploy Automático via Git

1. **Conectar Repositório**
   ```bash
   # Push do código para GitHub
   git add .
   git commit -m "feat: projeto pronto para deploy"
   git push origin main
   ```

2. **Configurar Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub
   - Configure as opções:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Node version**: `18`

3. **Variáveis de Ambiente**
   ```
   VITE_API_URL=https://api.casaterra.com
   VITE_APP_NAME=Portal Casa & Terra
   ```

### Método 2: Deploy Manual

1. **Build Local**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   # Instalar Netlify CLI
   npm install -g netlify-cli
   
   # Login
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

### Método 3: Drag & Drop

1. Build local: `npm run build`
2. Acesse [netlify.com/drop](https://netlify.com/drop)
3. Arraste a pasta `dist` para a área de upload

## 🖥️ Deploy do Backend (.NET Core)

### Deploy em IIS (Windows Server)

1. **Preparar Servidor**
   ```powershell
   # Instalar .NET 8.0 Runtime
   # Instalar IIS com ASP.NET Core Module
   # Configurar SQL Server
   ```

2. **Build e Publish**
   ```bash
   cd backend
   dotnet publish -c Release -o ./publish
   ```

3. **Configurar IIS**
   - Criar novo site no IIS
   - Apontar para pasta publish
   - Configurar pool de aplicação (.NET Core)
   - Configurar string de conexão

4. **Configurar appsettings.Production.json**
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=prod-server;Database=CasaTerraPortal;..."
     },
     "Jwt": {
       "Key": "production-secret-key",
       "Issuer": "https://api.casaterra.com",
       "Audience": "https://portal.casaterra.com"
     }
   }
   ```

### Deploy em Linux (Ubuntu/CentOS)

1. **Instalar Dependências**
   ```bash
   # Ubuntu
   sudo apt update
   sudo apt install -y dotnet-runtime-8.0 nginx
   
   # CentOS
   sudo yum install -y dotnet-runtime-8.0 nginx
   ```

2. **Configurar Aplicação**
   ```bash
   # Copiar arquivos
   sudo cp -r ./publish /var/www/casaterra-portal/
   
   # Configurar permissões
   sudo chown -R www-data:www-data /var/www/casaterra-portal/
   sudo chmod -R 755 /var/www/casaterra-portal/
   ```

3. **Configurar Systemd Service**
   ```bash
   sudo nano /etc/systemd/system/casaterra-portal.service
   ```
   
   ```ini
   [Unit]
   Description=Casa Terra Portal API
   After=network.target
   
   [Service]
   Type=notify
   ExecStart=/usr/bin/dotnet /var/www/casaterra-portal/CasaTerra.Portal.API.dll
   Restart=always
   RestartSec=5
   User=www-data
   Environment=ASPNETCORE_ENVIRONMENT=Production
   Environment=ASPNETCORE_URLS=http://localhost:5000
   
   [Install]
   WantedBy=multi-user.target
   ```

4. **Configurar Nginx**
   ```nginx
   server {
       listen 80;
       server_name api.casaterra.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection keep-alive;
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

5. **Iniciar Serviços**
   ```bash
   sudo systemctl enable casaterra-portal
   sudo systemctl start casaterra-portal
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

## 🐳 Deploy com Docker

### Docker Compose (Recomendado)

1. **Configurar Ambiente**
   ```bash
   # Criar arquivo .env
   cp .env.example .env
   # Editar variáveis de produção
   ```

2. **Deploy**
   ```bash
   # Build e start
   docker-compose -f docker-compose.prod.yml up -d
   
   # Verificar status
   docker-compose ps
   
   # Ver logs
   docker-compose logs -f
   ```

### Docker Individual

1. **Frontend**
   ```bash
   # Build
   docker build -t casaterra-frontend ./frontend
   
   # Run
   docker run -d -p 80:80 --name casaterra-frontend casaterra-frontend
   ```

2. **Backend**
   ```bash
   # Build
   docker build -t casaterra-backend ./backend
   
   # Run
   docker run -d -p 5000:80 --name casaterra-backend \
     -e ConnectionStrings__DefaultConnection="..." \
     casaterra-backend
   ```

## ☁️ Deploy em Cloud

### Azure App Service

1. **Criar Recursos**
   ```bash
   # Azure CLI
   az group create --name casaterra-rg --location eastus
   az appservice plan create --name casaterra-plan --resource-group casaterra-rg --sku B1
   az webapp create --name casaterra-portal --resource-group casaterra-rg --plan casaterra-plan
   ```

2. **Deploy**
   ```bash
   # Frontend (Static Web App)
   az staticwebapp create --name casaterra-frontend --resource-group casaterra-rg
   
   # Backend (App Service)
   az webapp deployment source config --name casaterra-portal --resource-group casaterra-rg --repo-url https://github.com/...
   ```

### AWS

1. **Frontend (S3 + CloudFront)**
   ```bash
   # Build
   npm run build
   
   # Upload para S3
   aws s3 sync dist/ s3://casaterra-portal-frontend
   
   # Configurar CloudFront
   aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
   ```

2. **Backend (Elastic Beanstalk)**
   ```bash
   # Criar aplicação
   eb init casaterra-portal
   eb create production
   eb deploy
   ```

## 🔧 Configurações de Produção

### Variáveis de Ambiente

**Frontend (.env.production)**
```env
VITE_API_URL=https://api.casaterra.com
VITE_APP_NAME=Portal Casa & Terra
VITE_ENVIRONMENT=production
```

**Backend (appsettings.Production.json)**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": ["portal.casaterra.com"],
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-sql;Database=CasaTerraPortal;..."
  }
}
```

### SSL/HTTPS

1. **Certificado SSL**
   ```bash
   # Let's Encrypt (gratuito)
   sudo certbot --nginx -d portal.casaterra.com
   ```

2. **Configuração Nginx**
   ```nginx
   server {
       listen 443 ssl;
       server_name portal.casaterra.com;
       
       ssl_certificate /etc/letsencrypt/live/portal.casaterra.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/portal.casaterra.com/privkey.pem;
       
       # Configurações SSL...
   }
   ```

## 📊 Monitoramento

### Health Checks

1. **Frontend**
   ```bash
   curl -f https://portal.casaterra.com
   ```

2. **Backend**
   ```bash
   curl -f https://api.casaterra.com/health
   ```

### Logs

1. **Aplicação**
   ```bash
   # Docker
   docker-compose logs -f
   
   # Systemd
   sudo journalctl -u casaterra-portal -f
   ```

2. **Nginx**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🆘 Troubleshooting

### Problemas Comuns

1. **Build Falha**
   ```bash
   # Limpar cache
   npm ci
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **CORS Errors**
   - Verificar configuração de CORS no backend
   - Confirmar URLs de origem permitidas

3. **Database Connection**
   - Verificar string de conexão
   - Confirmar firewall/security groups
   - Testar conectividade

4. **SSL Issues**
   ```bash
   # Renovar certificado
   sudo certbot renew
   sudo systemctl reload nginx
   ```

## 📞 Suporte

- **Documentação**: [docs.casaterra.com](https://docs.casaterra.com)
- **Issues**: GitHub Issues
- **Email**: devops@casaterra.com
- **Slack**: #portal-deploy

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0