import { Department } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'rh',
    name: 'Recursos Humanos',
    description: 'Gestão de pessoas, folha de pagamento e benefícios',
    icon: 'Users',
    color: 'bg-blue-500',
    applications: [
      { id: 'rh-1', name: 'Sistema RH', description: 'Gestão de funcionários', url: '/rh/sistema', icon: 'UserCheck', category: 'Gestão' },
      { id: 'rh-2', name: 'Folha de Pagamento', description: 'Controle salarial', url: '/rh/folha', icon: 'Calculator', category: 'Financeiro' }
    ],
    reports: [
      { id: 'rh-r1', name: 'Relatório de Funcionários', description: 'Lista completa de colaboradores', url: '/reports/funcionarios', type: 'excel' }
    ]
  },
  {
    id: 'juridico',
    name: 'Jurídico',
    description: 'Assessoria jurídica e contratos',
    icon: 'Scale',
    color: 'bg-purple-500',
    applications: [
      { id: 'jur-1', name: 'Gestão de Contratos', description: 'Controle de documentos legais', url: '/juridico/contratos', icon: 'FileText', category: 'Documentos' }
    ],
    reports: [
      { id: 'jur-r1', name: 'Relatório Jurídico', description: 'Status de processos', url: '/reports/juridico', type: 'pdf' }
    ]
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    description: 'Controle financeiro e contabilidade',
    icon: 'DollarSign',
    color: 'bg-green-500',
    applications: [
      { id: 'fin-1', name: 'ERP Financeiro', description: 'Sistema financeiro integrado', url: '/financeiro/erp', icon: 'TrendingUp', category: 'ERP' },
      { id: 'fin-2', name: 'Contas a Pagar', description: 'Gestão de pagamentos', url: '/financeiro/pagar', icon: 'CreditCard', category: 'Pagamentos' }
    ],
    reports: [
      { id: 'fin-r1', name: 'DRE', description: 'Demonstrativo de resultados', url: '/reports/dre', type: 'dashboard' }
    ]
  },
  {
    id: 'cobranca',
    name: 'Cobrança',
    description: 'Gestão de cobranças e inadimplência',
    icon: 'Receipt',
    color: 'bg-orange-500',
    applications: [
      { id: 'cob-1', name: 'Sistema de Cobrança', description: 'Controle de recebimentos', url: '/cobranca/sistema', icon: 'Clock', category: 'Cobrança' }
    ],
    reports: [
      { id: 'cob-r1', name: 'Inadimplência', description: 'Relatório de atrasos', url: '/reports/inadimplencia', type: 'excel' }
    ]
  },
  {
    id: 'administrativo',
    name: 'Administrativo',
    description: 'Gestão administrativa geral',
    icon: 'Building',
    color: 'bg-gray-500',
    applications: [
      { id: 'adm-1', name: 'Portal Administrativo', description: 'Gestão geral', url: '/admin/portal', icon: 'Settings', category: 'Administração' }
    ],
    reports: [
      { id: 'adm-r1', name: 'Relatório Administrativo', description: 'Visão geral administrativa', url: '/reports/admin', type: 'dashboard' }
    ]
  },
  {
    id: 'assessoria-societaria',
    name: 'Assessoria Societária',
    description: 'Gestão societária e corporativa',
    icon: 'Shield',
    color: 'bg-indigo-500',
    applications: [
      { id: 'soc-1', name: 'Gestão Societária', description: 'Controle societário', url: '/societaria/gestao', icon: 'Crown', category: 'Societário' }
    ],
    reports: [
      { id: 'soc-r1', name: 'Relatório Societário', description: 'Status societário', url: '/reports/societario', type: 'pdf' }
    ]
  },
  {
    id: 'central-solucoes',
    name: 'Central de Soluções',
    description: 'Atendimento e suporte ao cliente',
    icon: 'Headphones',
    color: 'bg-teal-500',
    applications: [
      { id: 'cs-1', name: 'Sistema de Tickets', description: 'Gestão de chamados', url: '/solucoes/tickets', icon: 'MessageCircle', category: 'Atendimento' }
    ],
    reports: [
      { id: 'cs-r1', name: 'Relatório de Atendimento', description: 'Métricas de suporte', url: '/reports/atendimento', type: 'dashboard' }
    ]
  },
  {
    id: 'comercial',
    name: 'Comercial',
    description: 'Gestão comercial e vendas',
    icon: 'ShoppingCart',
    color: 'bg-red-500',
    applications: [
      { id: 'com-1', name: 'CRM Comercial', description: 'Gestão de clientes', url: '/comercial/crm', icon: 'Users2', category: 'CRM' }
    ],
    reports: [
      { id: 'com-r1', name: 'Relatório de Vendas', description: 'Performance comercial', url: '/reports/vendas', type: 'dashboard' }
    ]
  },
  {
    id: 'contabil',
    name: 'Contábil',
    description: 'Contabilidade e demonstrações',
    icon: 'Calculator',
    color: 'bg-yellow-500',
    applications: [
      { id: 'cnt-1', name: 'Sistema Contábil', description: 'Gestão contábil', url: '/contabil/sistema', icon: 'BookOpen', category: 'Contabilidade' }
    ],
    reports: [
      { id: 'cnt-r1', name: 'Balancete', description: 'Demonstrações contábeis', url: '/reports/balancete', type: 'excel' }
    ]
  },
  {
    id: 'corretores',
    name: 'Corretores',
    description: 'Gestão de corretores e comissões',
    icon: 'Handshake',
    color: 'bg-pink-500',
    applications: [
      { id: 'cor-1', name: 'Portal do Corretor', description: 'Área do corretor', url: '/corretores/portal', icon: 'UserTie', category: 'Corretor' }
    ],
    reports: [
      { id: 'cor-r1', name: 'Comissões', description: 'Relatório de comissões', url: '/reports/comissoes', type: 'excel' }
    ]
  },
  {
    id: 'controle-vendas',
    name: 'Controle de Vendas',
    description: 'Monitoramento e controle de vendas',
    icon: 'BarChart3',
    color: 'bg-emerald-500',
    applications: [
      { id: 'cv-1', name: 'Dashboard Vendas', description: 'Controle de vendas', url: '/vendas/dashboard', icon: 'TrendingUp', category: 'Vendas' }
    ],
    reports: [
      { id: 'cv-r1', name: 'Performance de Vendas', description: 'Métricas de vendas', url: '/reports/performance', type: 'dashboard' }
    ]
  },
  {
    id: 'diretoria',
    name: 'Diretoria',
    description: 'Visão executiva e estratégica',
    icon: 'Crown',
    color: 'bg-violet-500',
    applications: [
      { id: 'dir-1', name: 'Dashboard Executivo', description: 'Visão estratégica', url: '/diretoria/dashboard', icon: 'Eye', category: 'Executivo' }
    ],
    reports: [
      { id: 'dir-r1', name: 'Relatório Executivo', description: 'KPIs estratégicos', url: '/reports/executivo', type: 'dashboard' }
    ]
  },
  {
    id: 'dm',
    name: 'Desenvolvimento de Mercado',
    description: 'Análise e desenvolvimento de mercado',
    icon: 'Target',
    color: 'bg-cyan-500',
    applications: [
      { id: 'dm-1', name: 'Análise de Mercado', description: 'Estudos de mercado', url: '/dm/analise', icon: 'TrendingUp', category: 'Análise' }
    ],
    reports: [
      { id: 'dm-r1', name: 'Pesquisa de Mercado', description: 'Dados de mercado', url: '/reports/mercado', type: 'pdf' }
    ]
  },
  {
    id: 'engenharia',
    name: 'Engenharia',
    description: 'Projetos e desenvolvimento técnico',
    icon: 'Wrench',
    color: 'bg-slate-500',
    applications: [
      { id: 'eng-1', name: 'Gestão de Projetos', description: 'Controle de projetos', url: '/engenharia/projetos', icon: 'Blueprint', category: 'Projetos' }
    ],
    reports: [
      { id: 'eng-r1', name: 'Status de Projetos', description: 'Andamento dos projetos', url: '/reports/projetos', type: 'dashboard' }
    ]
  },
  {
    id: 'escritorio',
    name: 'Escritório',
    description: 'Gestão do escritório e infraestrutura',
    icon: 'Building2',
    color: 'bg-amber-500',
    applications: [
      { id: 'esc-1', name: 'Gestão de Escritório', description: 'Controle operacional', url: '/escritorio/gestao', icon: 'Home', category: 'Operacional' }
    ],
    reports: [
      { id: 'esc-r1', name: 'Relatório Operacional', description: 'Métricas operacionais', url: '/reports/operacional', type: 'excel' }
    ]
  },
  {
    id: 'gestao-contratos',
    name: 'Gestão de Contratos',
    description: 'Controle e gestão de contratos',
    icon: 'FileCheck',
    color: 'bg-lime-500',
    applications: [
      { id: 'gc-1', name: 'Sistema de Contratos', description: 'Gestão contratual', url: '/contratos/sistema', icon: 'FileText', category: 'Contratos' }
    ],
    reports: [
      { id: 'gc-r1', name: 'Status Contratos', description: 'Situação dos contratos', url: '/reports/contratos', type: 'excel' }
    ]
  },
  {
    id: 'suprimentos',
    name: 'Suprimentos',
    description: 'Compras e fornecedores',
    icon: 'Package',
    color: 'bg-rose-500',
    applications: [
      { id: 'sup-1', name: 'Sistema de Compras', description: 'Gestão de suprimentos', url: '/suprimentos/compras', icon: 'ShoppingBag', category: 'Compras' }
    ],
    reports: [
      { id: 'sup-r1', name: 'Relatório de Compras', description: 'Análise de suprimentos', url: '/reports/compras', type: 'excel' }
    ]
  },
  {
    id: 'obras',
    name: 'Obras',
    description: 'Gestão e acompanhamento de obras',
    icon: 'HardHat',
    color: 'bg-orange-600',
    applications: [
      { id: 'obr-1', name: 'Controle de Obras', description: 'Acompanhamento de obras', url: '/obras/controle', icon: 'Construction', category: 'Obras' }
    ],
    reports: [
      { id: 'obr-r1', name: 'Andamento de Obras', description: 'Status das obras', url: '/reports/obras', type: 'dashboard' }
    ]
  },
  {
    id: 'projetos',
    name: 'Projetos',
    description: 'Gerenciamento de projetos corporativos',
    icon: 'Folder',
    color: 'bg-blue-600',
    applications: [
      { id: 'prj-1', name: 'PMO', description: 'Escritório de projetos', url: '/projetos/pmo', icon: 'FolderOpen', category: 'PMO' }
    ],
    reports: [
      { id: 'prj-r1', name: 'Portfolio de Projetos', description: 'Visão geral dos projetos', url: '/reports/portfolio', type: 'dashboard' }
    ]
  },
  {
    id: 'regionais',
    name: 'Regionais',
    description: 'Gestão das filiais regionais',
    icon: 'MapPin',
    color: 'bg-green-600',
    applications: [
      { id: 'reg-1', name: 'Portal Regional', description: 'Gestão regional', url: '/regionais/portal', icon: 'Map', category: 'Regional' }
    ],
    reports: [
      { id: 'reg-r1', name: 'Performance Regional', description: 'Métricas por região', url: '/reports/regional', type: 'dashboard' }
    ]
  },
  {
    id: 'retencao-quitacao',
    name: 'Retenção e Quitação',
    description: 'Gestão de retenções e quitações',
    icon: 'CheckCircle',
    color: 'bg-teal-600',
    applications: [
      { id: 'rq-1', name: 'Sistema de Quitação', description: 'Controle de quitações', url: '/quitacao/sistema', icon: 'Check', category: 'Quitação' }
    ],
    reports: [
      { id: 'rq-r1', name: 'Relatório de Quitações', description: 'Status de quitações', url: '/reports/quitacoes', type: 'excel' }
    ]
  }
];