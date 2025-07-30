import { Building2, Users, DollarSign, FileText, Shield, Briefcase, HeadphonesIcon, TrendingUp, Calculator, UserCheck, BarChart3, Crown, Target, Wrench, MapPin, FileCheck, Package, Hammer, Clipboard, Map, HandHeart } from 'lucide-react';

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  applications: Application[];
  reports: Report[];
}

export interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'dashboard' | 'pdf' | 'excel';
}

export const departments: Department[] = [
  {
    id: 'rh',
    name: 'RH',
    description: 'Recursos Humanos - Gestão de pessoas e talentos',
    icon: 'Users',
    color: 'blue',
    applications: [
      {
        id: 'rh-sistema',
        name: 'Sistema RH',
        description: 'Gestão de funcionários e folha de pagamento',
        url: '/rh/sistema',
        icon: 'Users',
        category: 'Gestão'
      }
    ],
    reports: [
      {
        id: 'folha-pagamento',
        name: 'Folha de Pagamento',
        description: 'Relatório mensal da folha de pagamento',
        url: '/reports/folha-pagamento',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'juridico',
    name: 'Jurídico',
    description: 'Departamento Jurídico - Assessoria legal e contratos',
    icon: 'Shield',
    color: 'purple',
    applications: [
      {
        id: 'juridico-contratos',
        name: 'Gestão de Contratos',
        description: 'Sistema de contratos e documentos legais',
        url: '/juridico/contratos',
        icon: 'FileText',
        category: 'Legal'
      }
    ],
    reports: [
      {
        id: 'processos-juridicos',
        name: 'Processos Jurídicos',
        description: 'Relatório de processos em andamento',
        url: '/reports/processos',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    description: 'Gestão financeira e contábil da empresa',
    icon: 'DollarSign',
    color: 'green',
    applications: [
      {
        id: 'sap-financeiro',
        name: 'SAP Financeiro',
        description: 'Sistema integrado de gestão financeira',
        url: '/financeiro/sap',
        icon: 'DollarSign',
        category: 'ERP'
      }
    ],
    reports: [
      {
        id: 'balancete',
        name: 'Balancete Mensal',
        description: 'Relatório financeiro mensal',
        url: '/reports/balancete',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'cobranca',
    name: 'Cobrança',
    description: 'Gestão de cobranças e recuperação de crédito',
    icon: 'FileText',
    color: 'orange',
    applications: [
      {
        id: 'sistema-cobranca',
        name: 'Sistema de Cobrança',
        description: 'Gestão de inadimplência e cobrança',
        url: '/cobranca/sistema',
        icon: 'FileText',
        category: 'Financeiro'
      }
    ],
    reports: [
      {
        id: 'inadimplencia',
        name: 'Relatório de Inadimplência',
        description: 'Análise de inadimplência por período',
        url: '/reports/inadimplencia',
        type: 'excel'
      }
    ]
  },
  {
    id: 'administrativo',
    name: 'Administrativo',
    description: 'Gestão administrativa e operacional',
    icon: 'Briefcase',
    color: 'gray',
    applications: [
      {
        id: 'admin-sistema',
        name: 'Sistema Administrativo',
        description: 'Gestão de processos administrativos',
        url: '/admin/sistema',
        icon: 'Briefcase',
        category: 'Gestão'
      }
    ],
    reports: [
      {
        id: 'processos-admin',
        name: 'Processos Administrativos',
        description: 'Relatório de processos administrativos',
        url: '/reports/processos-admin',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'assessoria-societaria',
    name: 'Assessoria Societária',
    description: 'Assessoria em questões societárias e corporativas',
    icon: 'Building2',
    color: 'indigo',
    applications: [
      {
        id: 'societario-sistema',
        name: 'Sistema Societário',
        description: 'Gestão de questões societárias',
        url: '/societario/sistema',
        icon: 'Building2',
        category: 'Corporativo'
      }
    ],
    reports: [
      {
        id: 'societario-relatorio',
        name: 'Relatório Societário',
        description: 'Análise societária mensal',
        url: '/reports/societario',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'central-solucoes',
    name: 'Central de Soluções',
    description: 'Atendimento ao cliente e suporte técnico',
    icon: 'HeadphonesIcon',
    color: 'teal',
    applications: [
      {
        id: 'central-atendimento',
        name: 'Sistema de Atendimento',
        description: 'Gestão de chamados e suporte',
        url: '/central/atendimento',
        icon: 'HeadphonesIcon',
        category: 'Suporte'
      }
    ],
    reports: [
      {
        id: 'atendimento-relatorio',
        name: 'Relatório de Atendimento',
        description: 'Métricas de atendimento ao cliente',
        url: '/reports/atendimento',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'comercial',
    name: 'Comercial',
    description: 'Gestão comercial e vendas',
    icon: 'TrendingUp',
    color: 'red',
    applications: [
      {
        id: 'crm-vendas',
        name: 'CRM Vendas',
        description: 'Sistema de gestão de vendas',
        url: '/comercial/crm',
        icon: 'TrendingUp',
        category: 'Vendas'
      }
    ],
    reports: [
      {
        id: 'vendas-relatorio',
        name: 'Relatório de Vendas',
        description: 'Análise de vendas por período',
        url: '/reports/vendas',
        type: 'excel'
      }
    ]
  },
  {
    id: 'contabil',
    name: 'Contábil',
    description: 'Contabilidade e gestão fiscal',
    icon: 'Calculator',
    color: 'yellow',
    applications: [
      {
        id: 'sistema-contabil',
        name: 'Sistema Contábil',
        description: 'Gestão contábil e fiscal',
        url: '/contabil/sistema',
        icon: 'Calculator',
        category: 'Contabilidade'
      }
    ],
    reports: [
      {
        id: 'demonstrativos',
        name: 'Demonstrativos Contábeis',
        description: 'Demonstrativos financeiros',
        url: '/reports/demonstrativos',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'corretores',
    name: 'Corretores',
    description: 'Gestão de corretores e comissões',
    icon: 'UserCheck',
    color: 'pink',
    applications: [
      {
        id: 'sistema-corretores',
        name: 'Sistema de Corretores',
        description: 'Gestão de corretores e comissões',
        url: '/corretores/sistema',
        icon: 'UserCheck',
        category: 'Vendas'
      }
    ],
    reports: [
      {
        id: 'comissoes',
        name: 'Relatório de Comissões',
        description: 'Comissões de corretores',
        url: '/reports/comissoes',
        type: 'excel'
      }
    ]
  },
  {
    id: 'controle-vendas',
    name: 'Controle de Vendas',
    description: 'Controle e análise de vendas',
    icon: 'BarChart3',
    color: 'cyan',
    applications: [
      {
        id: 'controle-vendas-sistema',
        name: 'Sistema de Controle',
        description: 'Controle detalhado de vendas',
        url: '/controle-vendas/sistema',
        icon: 'BarChart3',
        category: 'Análise'
      }
    ],
    reports: [
      {
        id: 'controle-vendas-relatorio',
        name: 'Controle de Vendas',
        description: 'Análise detalhada de vendas',
        url: '/reports/controle-vendas',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'diretoria',
    name: 'Diretoria',
    description: 'Gestão executiva e estratégica',
    icon: 'Crown',
    color: 'amber',
    applications: [
      {
        id: 'dashboard-executivo',
        name: 'Dashboard Executivo',
        description: 'Visão executiva da empresa',
        url: '/diretoria/dashboard',
        icon: 'Crown',
        category: 'Executivo'
      }
    ],
    reports: [
      {
        id: 'relatorio-executivo',
        name: 'Relatório Executivo',
        description: 'Relatório gerencial executivo',
        url: '/reports/executivo',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'dm',
    name: 'DM',
    description: 'Desenvolvimento de Mercado',
    icon: 'Target',
    color: 'lime',
    applications: [
      {
        id: 'dm-sistema',
        name: 'Sistema DM',
        description: 'Desenvolvimento de mercado',
        url: '/dm/sistema',
        icon: 'Target',
        category: 'Marketing'
      }
    ],
    reports: [
      {
        id: 'mercado-relatorio',
        name: 'Análise de Mercado',
        description: 'Relatório de desenvolvimento de mercado',
        url: '/reports/mercado',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'engenharia',
    name: 'Engenharia',
    description: 'Projetos e desenvolvimento técnico',
    icon: 'Wrench',
    color: 'slate',
    applications: [
      {
        id: 'cad-sistema',
        name: 'Sistema CAD',
        description: 'Projetos e desenhos técnicos',
        url: '/engenharia/cad',
        icon: 'Wrench',
        category: 'Técnico'
      }
    ],
    reports: [
      {
        id: 'projetos-relatorio',
        name: 'Relatório de Projetos',
        description: 'Status dos projetos em andamento',
        url: '/reports/projetos',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'escritorio',
    name: 'Escritório',
    description: 'Gestão de escritório e facilities',
    icon: 'MapPin',
    color: 'stone',
    applications: [
      {
        id: 'facilities-sistema',
        name: 'Sistema Facilities',
        description: 'Gestão de facilities e escritório',
        url: '/escritorio/facilities',
        icon: 'MapPin',
        category: 'Facilities'
      }
    ],
    reports: [
      {
        id: 'facilities-relatorio',
        name: 'Relatório Facilities',
        description: 'Relatório de facilities',
        url: '/reports/facilities',
        type: 'excel'
      }
    ]
  },
  {
    id: 'gestao-contratos',
    name: 'Gestão de Contratos',
    description: 'Gestão e controle de contratos',
    icon: 'FileCheck',
    color: 'emerald',
    applications: [
      {
        id: 'contratos-sistema',
        name: 'Sistema de Contratos',
        description: 'Gestão completa de contratos',
        url: '/contratos/sistema',
        icon: 'FileCheck',
        category: 'Jurídico'
      }
    ],
    reports: [
      {
        id: 'contratos-relatorio',
        name: 'Relatório de Contratos',
        description: 'Status e vencimentos de contratos',
        url: '/reports/contratos',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'suprimentos',
    name: 'Suprimentos',
    description: 'Gestão de compras e suprimentos',
    icon: 'Package',
    color: 'violet',
    applications: [
      {
        id: 'compras-sistema',
        name: 'Sistema de Compras',
        description: 'Gestão de compras e fornecedores',
        url: '/suprimentos/compras',
        icon: 'Package',
        category: 'Compras'
      }
    ],
    reports: [
      {
        id: 'compras-relatorio',
        name: 'Relatório de Compras',
        description: 'Análise de compras e fornecedores',
        url: '/reports/compras',
        type: 'excel'
      }
    ]
  },
  {
    id: 'obras',
    name: 'Obras',
    description: 'Gestão de obras e construção',
    icon: 'Hammer',
    color: 'orange',
    applications: [
      {
        id: 'obras-sistema',
        name: 'Sistema de Obras',
        description: 'Gestão de obras e cronogramas',
        url: '/obras/sistema',
        icon: 'Hammer',
        category: 'Construção'
      }
    ],
    reports: [
      {
        id: 'obras-relatorio',
        name: 'Relatório de Obras',
        description: 'Progresso e status das obras',
        url: '/reports/obras',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'projetos',
    name: 'Projetos',
    description: 'Gestão de projetos corporativos',
    icon: 'Clipboard',
    color: 'sky',
    applications: [
      {
        id: 'pms-sistema',
        name: 'Sistema PMS',
        description: 'Project Management System',
        url: '/projetos/pms',
        icon: 'Clipboard',
        category: 'Gestão'
      }
    ],
    reports: [
      {
        id: 'projetos-status',
        name: 'Status de Projetos',
        description: 'Acompanhamento de projetos',
        url: '/reports/projetos-status',
        type: 'dashboard'
      }
    ]
  },
  {
    id: 'regionais',
    name: 'Regionais',
    description: 'Gestão de filiais e regionais',
    icon: 'Map',
    color: 'rose',
    applications: [
      {
        id: 'regionais-sistema',
        name: 'Sistema Regionais',
        description: 'Gestão de filiais regionais',
        url: '/regionais/sistema',
        icon: 'Map',
        category: 'Regional'
      }
    ],
    reports: [
      {
        id: 'regionais-relatorio',
        name: 'Relatório Regionais',
        description: 'Performance das regionais',
        url: '/reports/regionais',
        type: 'excel'
      }
    ]
  },
  {
    id: 'retencao-quitacao',
    name: 'Retenção e Quitação',
    description: 'Gestão de retenção de clientes e quitação',
    icon: 'HandHeart',
    color: 'fuchsia',
    applications: [
      {
        id: 'retencao-sistema',
        name: 'Sistema de Retenção',
        description: 'Gestão de retenção e quitação',
        url: '/retencao/sistema',
        icon: 'HandHeart',
        category: 'Relacionamento'
      }
    ],
    reports: [
      {
        id: 'retencao-relatorio',
        name: 'Relatório de Retenção',
        description: 'Métricas de retenção de clientes',
        url: '/reports/retencao',
        type: 'dashboard'
      }
    ]
  }
];

// Função para obter departamentos por permissão do usuário
export function getDepartmentsByPermissions(permissions: string[]): Department[] {
  if (permissions.includes('all_departments')) {
    return departments;
  }
  
  return departments.filter(dept => 
    permissions.some(permission => 
      permission === dept.id || 
      permission.includes(dept.id)
    )
  );
}

// Função para obter departamento por ID
export function getDepartmentById(id: string): Department | undefined {
  return departments.find(dept => dept.id === id);
}

// Função para buscar departamentos
export function searchDepartments(query: string): Department[] {
  const searchTerm = query.toLowerCase();
  return departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm) ||
    dept.description.toLowerCase().includes(searchTerm)
  );
}