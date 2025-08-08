Imports System.Data

Partial Class _Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            CarregarDadosDashboard()
            CarregarAvisos()
            ConfigurarUsuario()
        End If
    End Sub

    Private Sub CarregarDadosDashboard()
        Try
            ' Simular dados do dashboard - em produção, estes dados viriam do banco de dados
            lblUsuariosConectados.Text = ObterUsuariosConectados().ToString()
            lblAniversariantes.Text = ObterAniversariantesDoMes().ToString()
            lblNovosColaboradores.Text = ObterNovosColaboradores().ToString()
        Catch ex As Exception
            ' Log do erro
            System.Diagnostics.Debug.WriteLine("Erro ao carregar dados do dashboard: " & ex.Message)
        End Try
    End Sub

    Private Sub CarregarAvisos()
        Try
            ' Criar lista de avisos - em produção, estes dados viriam do banco de dados
            Dim avisos As New List(Of Aviso)()
            
            avisos.Add(New Aviso With {
                .Titulo = "Reunião Geral - Resultados Q4",
                .Data = DateTime.Now.AddDays(-1),
                .Conteudo = "Reunião para apresentação dos resultados do quarto trimestre. Participação obrigatória para todos os gestores."
            })
            
            avisos.Add(New Aviso With {
                .Titulo = "Nova Política de Home Office",
                .Data = DateTime.Now.AddDays(-2),
                .Conteudo = "A partir de 01/02, nova política de trabalho remoto entra em vigor. Consulte o RH para mais detalhes."
            })
            
            avisos.Add(New Aviso With {
                .Titulo = "Manutenção do Sistema ERP",
                .Data = DateTime.Now.AddDays(-3),
                .Conteudo = "Sistema ERP ficará indisponível no sábado das 08h às 12h para manutenção preventiva."
            })
            
            avisos.Add(New Aviso With {
                .Titulo = "Campanha de Vacinação",
                .Data = DateTime.Now.AddDays(-5),
                .Conteudo = "Campanha de vacinação contra gripe disponível no ambulatório da empresa até o final do mês."
            })
            
            avisos.Add(New Aviso With {
                .Titulo = "Treinamento Segurança da Informação",
                .Data = DateTime.Now.AddDays(-7),
                .Conteudo = "Treinamento obrigatório sobre segurança da informação será realizado na próxima semana."
            })

            ' Ordenar por data decrescente
            avisos = avisos.OrderByDescending(Function(a) a.Data).ToList()

            rptAvisos.DataSource = avisos
            rptAvisos.DataBind()
        Catch ex As Exception
            ' Log do erro
            System.Diagnostics.Debug.WriteLine("Erro ao carregar avisos: " & ex.Message)
        End Try
    End Sub

    Private Sub ConfigurarUsuario()
        Try
            ' Simular dados do usuário logado - em produção, viria da sessão ou banco de dados
            Dim nomeUsuario As String = "Administrador Sistema"
            Dim iniciais As String = ObterIniciais(nomeUsuario)
            
            lblUserName.Text = nomeUsuario
            lblUserInitials.Text = iniciais
        Catch ex As Exception
            ' Log do erro
            System.Diagnostics.Debug.WriteLine("Erro ao configurar usuário: " & ex.Message)
            lblUserName.Text = "Usuário"
            lblUserInitials.Text = "U"
        End Try
    End Sub

    Private Function ObterUsuariosConectados() As Integer
        ' Simular consulta ao banco de dados
        ' Em produção, faria uma query para contar usuários ativos
        Dim random As New Random()
        Return random.Next(15, 35)
    End Function

    Private Function ObterAniversariantesDoMes() As Integer
        ' Simular consulta ao banco de dados
        ' Em produção, faria uma query para contar aniversariantes do mês atual
        Dim random As New Random()
        Return random.Next(5, 15)
    End Function

    Private Function ObterNovosColaboradores() As Integer
        ' Simular consulta ao banco de dados
        ' Em produção, faria uma query para contar admissões do mês atual
        Dim random As New Random()
        Return random.Next(1, 8)
    End Function

    Private Function ObterIniciais(nomeCompleto As String) As String
        Try
            If String.IsNullOrEmpty(nomeCompleto) Then
                Return "U"
            End If

            Dim palavras() As String = nomeCompleto.Split(" "c)
            Dim iniciais As String = ""

            For Each palavra As String In palavras
                If Not String.IsNullOrEmpty(palavra) Then
                    iniciais += palavra.Substring(0, 1).ToUpper()
                    If iniciais.Length >= 2 Then Exit For
                End If
            Next

            If iniciais.Length = 0 Then
                Return "U"
            ElseIf iniciais.Length = 1 Then
                Return iniciais
            Else
                Return iniciais.Substring(0, 2)
            End If
        Catch ex As Exception
            Return "U"
        End Try
    End Function

    ' Classe para representar um aviso
    Public Class Aviso
        Public Property Titulo As String
        Public Property Data As DateTime
        Public Property Conteudo As String
    End Class
End Class