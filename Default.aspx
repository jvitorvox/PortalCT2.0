<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portal Casa & Terra</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, #004F71 0%, #003a54 100%);
            color: white;
            padding: 15px 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .menu-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.3s;
        }

        .menu-toggle:hover {
            background-color: rgba(255,255,255,0.1);
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: white;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
            background-color: rgba(255,255,255,0.1);
            padding: 8px 15px;
            border-radius: 25px;
        }

        .user-avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #C63527;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            top: 70px;
            left: -280px;
            width: 280px;
            height: calc(100vh - 70px);
            background: linear-gradient(180deg, #004F71 0%, #003a54 100%);
            transition: left 0.3s ease;
            z-index: 999;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar.active {
            left: 0;
        }

        .sidebar-menu {
            list-style: none;
            padding: 20px 0;
        }

        .sidebar-menu li {
            margin: 5px 0;
        }

        .sidebar-menu a {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 25px;
            color: white;
            text-decoration: none;
            transition: all 0.3s;
            border-left: 4px solid transparent;
        }

        .sidebar-menu a:hover {
            background-color: rgba(255,255,255,0.1);
            border-left-color: #C63527;
            padding-left: 30px;
        }

        .sidebar-menu a.active {
            background-color: rgba(198,53,39,0.2);
            border-left-color: #C63527;
        }

        .sidebar-menu i {
            width: 20px;
            text-align: center;
            font-size: 16px;
        }

        .logout-btn {
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 20px;
        }

        .logout-btn a {
            color: #C63527 !important;
            font-weight: bold;
        }

        .logout-btn a:hover {
            background-color: rgba(198,53,39,0.1);
        }

        /* Main Content */
        .main-content {
            margin-left: 0;
            margin-top: 70px;
            padding: 30px;
            transition: margin-left 0.3s ease;
            min-height: calc(100vh - 70px);
        }

        .main-content.shifted {
            margin-left: 280px;
        }

        /* Cards Container */
        .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            border-left: 5px solid #004F71;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .card-title {
            font-size: 18px;
            font-weight: bold;
            color: #004F71;
        }

        .card-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #004F71, #C63527);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
        }

        .card-value {
            font-size: 36px;
            font-weight: bold;
            color: #C63527;
            margin: 10px 0;
        }

        .card-description {
            color: #666;
            font-size: 14px;
        }

        /* Avisos */
        .avisos-card {
            grid-column: 1 / -1;
            max-height: 400px;
        }

        .avisos-list {
            max-height: 300px;
            overflow-y: auto;
        }

        .aviso-item {
            padding: 15px;
            border-bottom: 1px solid #eee;
            transition: background-color 0.3s;
        }

        .aviso-item:hover {
            background-color: #f8f9fa;
        }

        .aviso-item:last-child {
            border-bottom: none;
        }

        .aviso-title {
            font-weight: bold;
            color: #004F71;
            margin-bottom: 5px;
        }

        .aviso-date {
            font-size: 12px;
            color: #999;
            margin-bottom: 8px;
        }

        .aviso-content {
            color: #666;
            line-height: 1.4;
        }

        /* Overlay */
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
        }

        .overlay.active {
            opacity: 1;
            visibility: visible;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .main-content {
                padding: 20px 15px;
            }

            .cards-container {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .header {
                padding: 15px;
            }

            .logo {
                font-size: 20px;
            }

            .user-info {
                padding: 6px 12px;
            }

            .user-info span {
                display: none;
            }
        }

        /* Animações */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .card {
            animation: fadeInUp 0.6s ease forwards;
        }

        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <!-- Header -->
        <header class="header">
            <div class="header-left">
                <button type="button" class="menu-toggle" onclick="toggleSidebar()">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="logo">
                    <i class="fas fa-building"></i>
                    Portal Casa & Terra
                </div>
            </div>
            <div class="header-right">
                <div class="user-info">
                    <div class="user-avatar">
                        <asp:Label ID="lblUserInitials" runat="server" Text="AD"></asp:Label>
                    </div>
                    <span>
                        <asp:Label ID="lblUserName" runat="server" Text="Administrador"></asp:Label>
                    </span>
                </div>
            </div>
        </header>

        <!-- Sidebar -->
        <nav class="sidebar" id="sidebar">
            <ul class="sidebar-menu">
                <li>
                    <a href="#" class="active" onclick="loadSection('dashboard')">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#" onclick="loadSection('financeiro')">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Financeiro</span>
                    </a>
                </li>
                <li>
                    <a href="#" onclick="loadSection('rh')">
                        <i class="fas fa-users"></i>
                        <span>RH</span>
                    </a>
                </li>
                <li>
                    <a href="#" onclick="loadSection('vendas')">
                        <i class="fas fa-chart-line"></i>
                        <span>Controle de Vendas</span>
                    </a>
                </li>
                <li>
                    <a href="#" onclick="loadSection('contabilidade')">
                        <i class="fas fa-calculator"></i>
                        <span>Contabilidade</span>
                    </a>
                </li>
                <li class="logout-btn">
                    <a href="#" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sair</span>
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Overlay -->
        <div class="overlay" id="overlay" onclick="closeSidebar()"></div>

        <!-- Main Content -->
        <main class="main-content" id="mainContent">
            <div class="cards-container">
                <!-- Card Usuários Conectados -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Usuários Conectados</div>
                        <div class="card-icon">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="card-value">
                        <asp:Label ID="lblUsuariosConectados" runat="server" Text="24"></asp:Label>
                    </div>
                    <div class="card-description">Usuários ativos no sistema</div>
                </div>

                <!-- Card Aniversariantes -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Aniversariantes do Mês</div>
                        <div class="card-icon">
                            <i class="fas fa-birthday-cake"></i>
                        </div>
                    </div>
                    <div class="card-value">
                        <asp:Label ID="lblAniversariantes" runat="server" Text="8"></asp:Label>
                    </div>
                    <div class="card-description">Colaboradores fazendo aniversário</div>
                </div>

                <!-- Card Novos Colaboradores -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Novos Colaboradores</div>
                        <div class="card-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                    </div>
                    <div class="card-value">
                        <asp:Label ID="lblNovosColaboradores" runat="server" Text="3"></asp:Label>
                    </div>
                    <div class="card-description">Admissões este mês</div>
                </div>

                <!-- Card Quadro de Avisos -->
                <div class="card avisos-card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-bullhorn"></i>
                            Quadro de Avisos
                        </div>
                    </div>
                    <div class="avisos-list">
                        <asp:Repeater ID="rptAvisos" runat="server">
                            <ItemTemplate>
                                <div class="aviso-item">
                                    <div class="aviso-title"><%# Eval("Titulo") %></div>
                                    <div class="aviso-date"><%# Eval("Data", "{0:dd/MM/yyyy HH:mm}") %></div>
                                    <div class="aviso-content"><%# Eval("Conteudo") %></div>
                                </div>
                            </ItemTemplate>
                        </asp:Repeater>
                    </div>
                </div>
            </div>
        </main>
    </form>

    <script>
        let sidebarOpen = false;

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const mainContent = document.getElementById('mainContent');

            sidebarOpen = !sidebarOpen;

            if (sidebarOpen) {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                if (window.innerWidth > 768) {
                    mainContent.classList.add('shifted');
                }
            } else {
                closeSidebar();
            }
        }

        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const mainContent = document.getElementById('mainContent');

            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            mainContent.classList.remove('shifted');
            sidebarOpen = false;
        }

        function loadSection(section) {
            // Remove active class from all menu items
            const menuItems = document.querySelectorAll('.sidebar-menu a');
            menuItems.forEach(item => item.classList.remove('active'));

            // Add active class to clicked item
            event.target.classList.add('active');

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                closeSidebar();
            }

            // Here you would typically load the content for the selected section
            console.log('Loading section:', section);
            
            // Example: You could use AJAX to load content or redirect to another page
            // window.location.href = section + '.aspx';
        }

        function logout() {
            if (confirm('Deseja realmente sair do sistema?')) {
                window.location.href = 'Login.aspx';
            }
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (sidebarOpen && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                closeSidebar();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && sidebarOpen) {
                document.getElementById('mainContent').classList.add('shifted');
            } else {
                document.getElementById('mainContent').classList.remove('shifted');
            }
        });
    </script>
</body>
</html>