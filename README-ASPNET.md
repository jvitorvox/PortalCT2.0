# 🏢 Portal Casa & Terra - ASP.NET/VB.NET

Sistema corporativo desenvolvido em ASP.NET Web Forms com VB.NET, utilizando as cores padrão da empresa (Azul #004F71 e Vermelho #C63527).

## 🎨 Características Visuais

- **Cores Corporativas**: Azul #004F71 e Vermelho #C63527
- **Menu Lateral**: Com botão hambúrguer responsivo
- **Design Moderno**: Interface limpa e profissional
- **Responsivo**: Funciona em desktop, tablet e mobile

## 📋 Funcionalidades

### 🔐 Sistema de Login
- Página de login com validação
- Autenticação via Forms Authentication
- Sessão segura com timeout configurável
- Opção "Lembrar-me"

### 🏠 Dashboard Principal
- **Cards Informativos**:
  - Usuários Conectados
  - Aniversariantes do Mês
  - Novos Colaboradores
  - Quadro de Avisos

### 🧭 Menu Lateral
- **Financeiro** - Gestão financeira
- **RH** - Recursos humanos
- **Controle de Vendas** - Acompanhamento de vendas
- **Contabilidade** - Gestão contábil
- **Sair** - Logout do sistema

### 👤 Cabeçalho
- Logo e nome "Portal Casa & Terra"
- Informações do usuário logado
- Avatar com iniciais do nome

## 🛠️ Tecnologias Utilizadas

- **ASP.NET Web Forms 4.8**
- **VB.NET**
- **HTML5/CSS3**
- **JavaScript**
- **Font Awesome** (ícones)
- **IIS** (servidor web)

## 📁 Estrutura do Projeto

```
Portal-Casa-Terra/
├── Default.aspx              # Página principal
├── Default.aspx.vb          # Code-behind principal
├── Login.aspx               # Página de login
├── Login.aspx.vb           # Code-behind login
├── Error.aspx              # Página de erro
├── Error.aspx.vb          # Code-behind erro
├── Global.asax            # Eventos globais da aplicação
├── Global.asax.vb        # Code-behind global
├── Web.config            # Configurações da aplicação
└── README-ASPNET.md      # Esta documentação
```

## 🚀 Como Executar

### Pré-requisitos
- **Windows Server** ou **Windows 10/11**
- **IIS** (Internet Information Services)
- **.NET Framework 4.8**
- **Visual Studio** (para desenvolvimento)

### Instalação no IIS

1. **Copiar arquivos** para `C:\inetpub\wwwroot\portal-casa-terra\`

2. **Configurar IIS**:
   - Abrir **Gerenciador do IIS**
   - Criar novo **Site**
   - Apontar para a pasta do projeto
   - Configurar **Pool de Aplicação** para .NET Framework 4.8

3. **Configurar permissões**:
   ```cmd
   icacls "C:\inetpub\wwwroot\portal-casa-terra" /grant "IIS_IUSRS:(OI)(CI)RX" /T
   ```

4. **Acessar**: `http://localhost` ou `http://seu-servidor`

## 🔑 Usuários de Teste

| Usuário | Senha | Perfil |
|---------|-------|--------|
| admin | 123456 | Administrador |
| financeiro | 123456 | Financeiro |
| rh | 123456 | RH |
| vendas | 123456 | Vendas |
| contabilidade | 123456 | Contabilidade |

## ⚙️ Configurações

### Web.config
- **Connection String**: Configurar banco de dados
- **Authentication**: Forms Authentication configurado
- **Session**: Timeout de 30 minutos
- **Errors**: Páginas de erro customizadas

### Banco de Dados (Opcional)
```sql
-- Exemplo de estrutura para usuários
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Usuario NVARCHAR(50) NOT NULL,
    Senha NVARCHAR(255) NOT NULL,
    NomeCompleto NVARCHAR(100) NOT NULL,
    Departamento NVARCHAR(50) NOT NULL,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME DEFAULT GETDATE()
);
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Login com validação
- [x] Logout seguro
- [x] Controle de sessão
- [x] Redirecionamento automático

### ✅ Interface
- [x] Menu lateral responsivo
- [x] Cards informativos
- [x] Design corporativo
- [x] Animações suaves

### ✅ Segurança
- [x] Forms Authentication
- [x] Validação de entrada
- [x] Headers de segurança
- [x] Tratamento de erros

## 🔧 Personalização

### Alterar Cores
No CSS das páginas, modificar:
```css
/* Cor principal (azul) */
#004F71

/* Cor secundária (vermelho) */
#C63527
```

### Adicionar Novos Usuários
No arquivo `Login.aspx.vb`, método `ValidarCredenciais()`:
```vb
Dim usuariosValidos As New Dictionary(Of String, String) From {
    {"novoUsuario", "novaSenha"}
}
```

### Personalizar Cards
No arquivo `Default.aspx.vb`, método `CarregarDadosDashboard()`:
```vb
' Implementar consultas ao banco de dados
lblUsuariosConectados.Text = ConsultarBancoDados().ToString()
```

## 📊 Monitoramento

### Logs
- Eventos registrados no **Debug Output**
- Erros capturados no **Global.asax**
- Tentativas de login registradas

### Performance
- Sessões otimizadas
- CSS/JS minificados
- Compressão habilitada no IIS

## 🔄 Próximas Melhorias

- [ ] Integração com Active Directory
- [ ] Banco de dados SQL Server
- [ ] Relatórios dinâmicos
- [ ] API REST para mobile
- [ ] Dashboard com gráficos
- [ ] Sistema de notificações

## 📞 Suporte

Para dúvidas ou problemas:
- **Email**: suporte@casaterra.com
- **Documentação**: Este README
- **Logs**: Verificar Debug Output no Visual Studio

---

**Desenvolvido para Casa & Terra**  
**Versão**: 1.0.0  
**Data**: Janeiro 2025