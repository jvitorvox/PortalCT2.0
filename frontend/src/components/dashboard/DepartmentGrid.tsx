import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DEPARTMENTS } from '../../data/departments';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { IconComponent } from '../icons/IconComponent';
import { Input } from '../ui/Input';
import { Search, ExternalLink, FileText } from 'lucide-react';

export const DepartmentGrid: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtrar departamentos baseado nas permissões do usuário
  const allowedDepartments = DEPARTMENTS.filter(dept => {
    if (user?.permissions?.includes('all_departments')) return true;
    return user?.permissions?.includes(dept.id);
  });

  // Filtrar por busca
  const filteredDepartments = allowedDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Obter categorias únicas
  const categories = ['all', ...new Set(allowedDepartments.flatMap(dept => 
    dept.applications.map(app => app.category)
  ))];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar departamentos, aplicações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${department.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent name={department.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <CardDescription>{department.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Applications */}
                {department.applications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                      <ExternalLink size={14} />
                      <span>Aplicações ({department.applications.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {department.applications.slice(0, 3).map((app) => (
                        <button
                          key={app.id}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent name={app.icon} size={14} className="text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{app.name}</p>
                            <p className="text-xs text-gray-500 truncate">{app.description}</p>
                          </div>
                        </button>
                      ))}
                      {department.applications.length > 3 && (
                        <p className="text-xs text-gray-500 pl-2">
                          +{department.applications.length - 3} mais aplicações
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Reports */}
                {department.reports.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                      <FileText size={14} />
                      <span>Relatórios ({department.reports.length})</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {department.reports.map((report) => (
                        <span
                          key={report.id}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            report.type === 'dashboard' ? 'bg-green-100 text-green-800' :
                            report.type === 'pdf' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {report.type.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Access Button */}
                <button className="w-full mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  Acessar Departamento
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum resultado encontrado</h3>
          <p className="text-gray-600">Tente ajustar sua busca ou filtros</p>
        </div>
      )}
    </div>
  );
};