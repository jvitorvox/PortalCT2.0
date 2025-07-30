import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardStats } from './DashboardStats';
import { DepartmentGrid } from './DepartmentGrid';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickLinks = [
    { name: 'ERP Financeiro', icon: 'TrendingUp', url: '/financeiro/erp', color: 'bg-green-500' },
    { name: 'Sistema RH', icon: 'Users', url: '/rh/sistema', color: 'bg-blue-500' },
    { name: 'Portal do Corretor', icon: 'UserTie', url: '/corretores/portal', color: 'bg-purple-500' },
    { name: 'Dashboard Vendas', icon: 'BarChart3', url: '/vendas/dashboard', color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { action: 'Relatório DRE gerado', time: '5 min atrás', user: 'João Silva' },
    { action: 'Nova aplicação adicionada ao Financeiro', time: '1 hora atrás', user: 'Sistema' },
    { action: 'Backup realizado com sucesso', time: '2 horas atrás', user: 'Sistema' },
    { action: 'Usuário Maria Santos fez login', time: '3 horas atrás', user: 'Sistema' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bem-vindo, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Portal corporativo Casa & Terra - {user?.department}
            </p>
            <div className="flex items-center space-x-4 mt-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{new Date().toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
          </div>
          
          {user?.avatar && (
            <div className="mt-6 lg:mt-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white/20 shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral do Sistema</h2>
        <DashboardStats />
      </section>

      {/* Quick Links and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
                <span>Acesso Rápido</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center`}>
                      <div className="w-6 h-6 bg-white rounded opacity-90" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{link.name}</p>
                      <p className="text-sm text-gray-500">Clique para acessar</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle size={20} className="text-blue-600" />
                <span>Atividade Recente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Department Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Departamentos Disponíveis</h2>
          <span className="text-sm text-gray-500">
            {user?.permissions?.includes('all_departments') ? 'Acesso completo' : 'Acesso limitado'}
          </span>
        </div>
        <DepartmentGrid />
      </section>
    </div>
  );
};