Partial Class ErrorPage
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            ' Verificar se estamos em modo de desenvolvimento para mostrar detalhes do erro
            Dim isDevelopment As Boolean = (ConfigurationManager.AppSettings("Environment") = "Development")
            
            If isDevelopment Then
                ' Tentar obter detalhes do erro da sessão ou query string
                Dim errorMessage As String = ""
                
                If Session("LastError") IsNot Nothing Then
                    errorMessage = Session("LastError").ToString()
                    Session.Remove("LastError")
                ElseIf Request.QueryString("error") IsNot Nothing Then
                    errorMessage = Server.UrlDecode(Request.QueryString("error"))
                End If
                
                If Not String.IsNullOrEmpty(errorMessage) Then
                    lblErrorDetails.Text = errorMessage
                    pnlErrorDetails.Visible = True
                End If
            End If
            
            ' Log do acesso à página de erro
            LogError("Página de erro acessada", Request.Url.ToString())
            
        Catch ex As Exception
            ' Se houver erro na própria página de erro, não fazer nada para evitar loop infinito
            System.Diagnostics.Debug.WriteLine("Erro na página de erro: " & ex.Message)
        End Try
    End Sub

    Private Sub LogError(acao As String, detalhes As String)
        Try
            Dim logMessage As String = String.Format("{0:yyyy-MM-dd HH:mm:ss} - {1} - {2} - IP: {3} - UserAgent: {4}",
                                                   DateTime.Now,
                                                   acao,
                                                   detalhes,
                                                   Request.UserHostAddress,
                                                   Request.UserAgent)
            
            System.Diagnostics.Debug.WriteLine(logMessage)
            
        Catch ex As Exception
            ' Não fazer nada se o log falhar
            System.Diagnostics.Debug.WriteLine("Erro no log da página de erro: " & ex.Message)
        End Try
    End Sub
End Class