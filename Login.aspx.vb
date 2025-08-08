Imports System.Web.Security

Partial Class Login
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            ' Limpar mensagens de erro
            pnlError.Visible = False
            
            ' Verificar se usuário já está logado
            If User.Identity.IsAuthenticated Then
                Response.Redirect("Default.aspx")
            End If
            
            ' Focar no campo usuário
            txtUsuario.Focus()
        End If
    End Sub

    Protected Sub btnLogin_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnLogin.Click
        Try
            ' Limpar mensagens de erro anteriores
            pnlError.Visible = False
            
            ' Validar campos obrigatórios
            If String.IsNullOrEmpty(txtUsuario.Text.Trim()) Then
                MostrarErro("Por favor, digite seu usuário.")
                txtUsuario.Focus()
                Return
            End If
            
            If String.IsNullOrEmpty(txtSenha.Text) Then
                MostrarErro("Por favor, digite sua senha.")
                txtSenha.Focus()
                Return
            End If
            
            ' Validar credenciais
            If ValidarCredenciais(txtUsuario.Text.Trim(), txtSenha.Text) Then
                ' Login bem-sucedido
                Dim usuario As String = txtUsuario.Text.Trim()
                
                ' Criar ticket de autenticação
                Dim ticket As New FormsAuthenticationTicket(
                    1,                              ' Versão
                    usuario,                        ' Nome do usuário
                    DateTime.Now,                   ' Data de criação
                    DateTime.Now.AddMinutes(30),    ' Data de expiração
                    chkLembrar.Checked,            ' Persistente
                    GetUserData(usuario),          ' Dados do usuário
                    FormsAuthentication.FormsCookiePath
                )
                
                ' Criptografar ticket
                Dim encryptedTicket As String = FormsAuthentication.Encrypt(ticket)
                
                ' Criar cookie
                Dim cookie As New HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket)
                If chkLembrar.Checked Then
                    cookie.Expires = DateTime.Now.AddDays(30)
                End If
                
                Response.Cookies.Add(cookie)
                
                ' Salvar informações na sessão
                Session("UsuarioLogado") = usuario
                Session("NomeCompleto") = GetNomeCompleto(usuario)
                Session("DataLogin") = DateTime.Now
                
                ' Log da ação
                LogAction("Login realizado", usuario)
                
                ' Redirecionar para página principal
                Dim returnUrl As String = Request.QueryString("ReturnUrl")
                If Not String.IsNullOrEmpty(returnUrl) Then
                    Response.Redirect(returnUrl)
                Else
                    Response.Redirect("Default.aspx")
                End If
            Else
                ' Login falhou
                MostrarErro("Usuário ou senha inválidos.")
                txtSenha.Text = ""
                txtUsuario.Focus()
                
                ' Log da tentativa de login inválida
                LogAction("Tentativa de login inválida", txtUsuario.Text.Trim())
            End If
            
        Catch ex As Exception
            ' Log do erro
            LogAction("Erro no login: " & ex.Message, txtUsuario.Text.Trim())
            MostrarErro("Erro interno do sistema. Tente novamente.")
        End Try
    End Sub

    Private Function ValidarCredenciais(usuario As String, senha As String) As Boolean
        Try
            ' Aqui você implementaria a validação real contra o banco de dados
            ' ou Active Directory. Por enquanto, vamos usar usuários de teste.
            
            Dim usuariosValidos As New Dictionary(Of String, String) From {
                {"admin", "123456"},
                {"financeiro", "123456"},
                {"rh", "123456"},
                {"vendas", "123456"},
                {"contabilidade", "123456"}
            }
            
            ' Converter para minúsculas para comparação case-insensitive
            usuario = usuario.ToLower()
            
            Return usuariosValidos.ContainsKey(usuario) AndAlso usuariosValidos(usuario) = senha
            
        Catch ex As Exception
            LogAction("Erro na validação de credenciais: " & ex.Message, usuario)
            Return False
        End Try
    End Function

    Private Function GetUserData(usuario As String) As String
        ' Retorna dados adicionais do usuário para armazenar no ticket
        Try
            Dim userData As String = ""
            
            Select Case usuario.ToLower()
                Case "admin"
                    userData = "Administrador|admin|Todos"
                Case "financeiro"
                    userData = "João Silva|financeiro|Financeiro"
                Case "rh"
                    userData = "Maria Santos|rh|RH"
                Case "vendas"
                    userData = "Carlos Oliveira|vendas|Vendas"
                Case "contabilidade"
                    userData = "Ana Costa|contabilidade|Contabilidade"
                Case Else
                    userData = "Usuário|user|Geral"
            End Select
            
            Return userData
            
        Catch ex As Exception
            LogAction("Erro ao obter dados do usuário: " & ex.Message, usuario)
            Return "Usuário|user|Geral"
        End Try
    End Function

    Private Function GetNomeCompleto(usuario As String) As String
        Try
            Select Case usuario.ToLower()
                Case "admin"
                    Return "Administrador Sistema"
                Case "financeiro"
                    Return "João Silva"
                Case "rh"
                    Return "Maria Santos"
                Case "vendas"
                    Return "Carlos Oliveira"
                Case "contabilidade"
                    Return "Ana Costa"
                Case Else
                    Return "Usuário Sistema"
            End Select
        Catch ex As Exception
            Return "Usuário Sistema"
        End Try
    End Function

    Private Sub MostrarErro(mensagem As String)
        lblError.Text = mensagem
        pnlError.Visible = True
    End Sub

    Private Sub LogAction(acao As String, usuario As String)
        Try
            ' Aqui você implementaria o log real (banco de dados, arquivo, etc.)
            ' Por enquanto, vamos usar o Debug
            Dim logMessage As String = String.Format("{0:yyyy-MM-dd HH:mm:ss} - {1} - {2} - IP: {3}",
                                                   DateTime.Now,
                                                   acao,
                                                   usuario,
                                                   Request.UserHostAddress)
            
            System.Diagnostics.Debug.WriteLine(logMessage)
            
        Catch ex As Exception
            ' Não fazer nada se o log falhar para não interromper o processo de login
            System.Diagnostics.Debug.WriteLine("Erro no log: " & ex.Message)
        End Try
    End Sub
End Class