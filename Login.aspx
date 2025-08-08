<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Login.aspx.vb" Inherits="Login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - Portal Casa & Terra</title>
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

        .login-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            width: 100%;
            max-width: 400px;
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

        .login-header {
            background: linear-gradient(135deg, #004F71 0%, #003a54 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }

        .login-header .logo {
            font-size: 48px;
            margin-bottom: 15px;
            color: #C63527;
        }

        .login-header h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .login-header p {
            opacity: 0.9;
            font-size: 14px;
        }

        .login-form {
            padding: 40px 30px;
        }

        .form-group {
            margin-bottom: 25px;
            position: relative;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
            font-size: 14px;
        }

        .form-group input {
            width: 100%;
            padding: 15px 20px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s;
            background-color: #f8f9fa;
        }

        .form-group input:focus {
            outline: none;
            border-color: #004F71;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(0,79,113,0.1);
        }

        .form-group .input-icon {
            position: absolute;
            right: 15px;
            top: 38px;
            color: #999;
            font-size: 16px;
        }

        .btn-login {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #004F71 0%, #C63527 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,79,113,0.3);
        }

        .btn-login:active {
            transform: translateY(0);
        }

        .error-message {
            background-color: #fee;
            color: #C63527;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #C63527;
            font-size: 14px;
        }

        .remember-me {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            font-size: 14px;
            color: #666;
        }

        .remember-me input {
            margin-right: 8px;
            width: auto;
        }

        .footer-links {
            text-align: center;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #eee;
        }

        .footer-links a {
            color: #004F71;
            text-decoration: none;
            font-size: 14px;
            margin: 0 10px;
        }

        .footer-links a:hover {
            text-decoration: underline;
        }

        @media (max-width: 480px) {
            .login-container {
                margin: 10px;
            }
            
            .login-header {
                padding: 30px 20px;
            }
            
            .login-form {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="login-container">
            <div class="login-header">
                <div class="logo">
                    <i class="fas fa-building"></i>
                </div>
                <h1>Portal Casa & Terra</h1>
                <p>Sistema Corporativo Integrado</p>
            </div>
            
            <div class="login-form">
                <asp:Panel ID="pnlError" runat="server" CssClass="error-message" Visible="false">
                    <asp:Label ID="lblError" runat="server"></asp:Label>
                </asp:Panel>
                
                <div class="form-group">
                    <label for="txtUsuario">Usuário</label>
                    <asp:TextBox ID="txtUsuario" runat="server" placeholder="Digite seu usuário" MaxLength="50"></asp:TextBox>
                    <i class="fas fa-user input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="txtSenha">Senha</label>
                    <asp:TextBox ID="txtSenha" runat="server" TextMode="Password" placeholder="Digite sua senha" MaxLength="50"></asp:TextBox>
                    <i class="fas fa-lock input-icon"></i>
                </div>
                
                <div class="remember-me">
                    <asp:CheckBox ID="chkLembrar" runat="server" Text="Lembrar-me" />
                </div>
                
                <asp:Button ID="btnLogin" runat="server" Text="Entrar" CssClass="btn-login" OnClick="btnLogin_Click" />
                
                <div class="footer-links">
                    <a href="#" onclick="alert('Entre em contato com o administrador do sistema.')">Esqueci minha senha</a>
                    <a href="#" onclick="alert('Entre em contato com o RH para solicitar acesso.')">Solicitar acesso</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>