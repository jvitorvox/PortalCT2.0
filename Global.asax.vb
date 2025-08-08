Imports System.Web.SessionState
Imports System.Web.Security

Public Class Global_asax
    Inherits System.Web.HttpApplication

    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Código que é executado na inicialização da aplicação
        Application("ApplicationName") = "Portal Casa & Terra"
        Application("Version") = "1.0.0"
        Application("StartTime") = DateTime.Now
        
        ' Log de inicialização
        System.Diagnostics.Debug.WriteLine("Aplicação Portal Casa & Terra iniciada em: " & DateTime.Now.ToString())
    End Sub

    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Código que é executado no encerramento da aplicação
        System.Diagnostics.Debug.WriteLine("Aplicação Portal Casa & Terra encerrada em: " & DateTime.Now.ToString())
    End Sub

    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
        ' Código que é executado quando um erro não tratado ocorre
        Dim ex As Exception = Server.GetLastError()
        
        If ex IsNot Nothing Then
            ' Log do erro
            Dim errorMessage As String = String.Format("Erro não tratado: {0} - {1} - URL: {2}",
                                                      ex.Message,
                                                      ex.StackTrace,
                                                      Request.Url.ToString())
            
            System.Diagnostics.Debug.WriteLine(errorMessage)
            
            ' Limpar o erro para evitar a página de erro padrão do ASP.NET
            Server.ClearError()
            
            ' Redirecionar para página de erro customizada
            Response.Redirect("~/Error.aspx")
        End If
    End Sub

    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Código que é executado quando uma nova sessão é iniciada
        Session("SessionStart") = DateTime.Now
        System.Diagnostics.Debug.WriteLine("Nova sessão iniciada: " & Session.SessionID)
    End Sub

    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Código que é executado quando uma sessão é encerrada
        System.Diagnostics.Debug.WriteLine("Sessão encerrada: " & Session.SessionID)
    End Sub

    Sub Application_AuthenticateRequest(ByVal sender As Object, ByVal e As EventArgs)
        ' Código que é executado durante a autenticação de cada requisição
        If HttpContext.Current.User IsNot Nothing AndAlso HttpContext.Current.User.Identity.IsAuthenticated Then
            If TypeOf HttpContext.Current.User.Identity Is FormsIdentity Then
                Dim identity As FormsIdentity = CType(HttpContext.Current.User.Identity, FormsIdentity)
                Dim ticket As FormsAuthenticationTicket = identity.Ticket
                
                ' Extrair dados do usuário do ticket
                If Not String.IsNullOrEmpty(ticket.UserData) Then
                    Dim userData() As String = ticket.UserData.Split("|"c)
                    If userData.Length >= 3 Then
                        ' Criar principal customizado com roles
                        Dim roles() As String = {userData(2)}
                        HttpContext.Current.User = New System.Security.Principal.GenericPrincipal(identity, roles)
                        
                        ' Armazenar informações na sessão se não existirem
                        If Session("NomeCompleto") Is Nothing Then
                            Session("NomeCompleto") = userData(0)
                            Session("UsuarioLogado") = userData(1)
                            Session("Departamento") = userData(2)
                        End If
                    End If
                End If
            End If
        End If
    End Sub

    Sub Application_PreSendRequestHeaders(ByVal sender As Object, ByVal e As EventArgs)
        ' Remover headers que revelam informações sobre o servidor
        Response.Headers.Remove("Server")
        Response.Headers.Add("X-Frame-Options", "SAMEORIGIN")
        Response.Headers.Add("X-XSS-Protection", "1; mode=block")
        Response.Headers.Add("X-Content-Type-Options", "nosniff")
    End Sub
End Class