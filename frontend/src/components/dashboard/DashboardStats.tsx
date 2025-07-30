import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { IconComponent } from '../icons/IconComponent';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon, color }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-600" />;
      default:
        return <Minus size={16} className="text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center space-x-1 mt-2">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
            <IconComponent name={icon} size={24} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Aplicações Ativas',
      value: '42',
      change: '+5 este mês',
      trend: 'up' as const,
      icon: 'Globe',
      color: 'bg-blue-500'
    },
    {
      title: 'Usuários Online',
      value: '156',
      change: '+12%',
      trend: 'up' as const,
      icon: 'Users',
      color: 'bg-green-500'
    },
    {
      title: 'Relatórios Gerados',
      value: '2.4k',
      change: '+18%',
      trend: 'up' as const,
      icon: 'FileText',
      color: 'bg-purple-500'
    },
    {
      title: 'Departamentos',
      value: '21',
      change: 'Estável',
      trend: 'neutral' as const,
      icon: 'Building',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};