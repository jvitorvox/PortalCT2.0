<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Error.aspx.vb" Inherits="ErrorPage" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Erro - Portal Casa & Terra</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #004F71 0%, #C63527 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .error-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 60px 40px;
            text-align: center;
            max-width: 500px;
            width: 100%;
            animation: slideUp 0.6s ease;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .error-icon {
            font-size: 80px;
            color: #C63527;
            margin-bottom: 30px;
        }

        .error-title {
            font-size: 32px;
            color: #004F71;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .error-message {
            font-size: 16px;
            color: #666;
            margin-bottom: 40px;
            line-height: 1.6;
        }

        .error-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }

        .btn-primary {
            background: linear-gradient(135deg, #004F71 0%, #C63527 100%);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,79,113,0.3);
        }

        .btn-secondary {
            background: #f8f9fa;
            color: #666;
            border: 2px solid #e1e5e9;
        }

        .btn-secondary:hover {
            background: #e9ecef;
            border-color: #adb5bd;
        }

        .error-details {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #eee;
            text-align: left;
        }

        .error-details h4 {
            color: #004F71;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .error-details pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            font-size: 12px;
            color: #666;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        @media (max-width: 480px) {
            .error-container {
                padding: 40px 20px;
            }
            
            .error-title {
                font-size: 24px;
            }
            
            .error-actions {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="error-container">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            
            <h1 class="error-title">Oops! Algo deu errado</h1>
            
            <p class="error-message">
                Ocorreu um erro inesperado no sistema. Nossa equipe técnica foi notificada 
                e está trabalhando para resolver o problema.
            </p>
            
            <div class="error-actions">
                <a href="Default.aspx" class="btn btn-primary">
                    <i class="fas fa-home"></i>
                    Voltar ao Início
                </a>
                
                <button type="button" class="btn btn-secondary" onclick="history.back()">
                    <i class="fas fa-arrow-left"></i>
                    Página Anterior
                </button>
                
                <button type="button" class="btn btn-secondary" onclick="location.reload()">
                    <i class="fas fa-refresh"></i>
                    Tentar Novamente
                </button>
            </div>
            
            <asp:Panel ID="pnlErrorDetails" runat="server" CssClass="error-details" Visible="false">
                <h4>Detalhes Técnicos:</h4>
                <pre><asp:Label ID="lblErrorDetails" runat="server"></asp:Label></pre>
            </asp:Panel>
        </div>
    </form>
    
    <script>
        // Reportar erro automaticamente (opcional)
        window.addEventListener('load', function() {
            // Aqui você poderia enviar informações do erro para um sistema de monitoramento
            console.log('Página de erro carregada em:', new Date().toISOString());
        });
    </script>
</body>
</html>