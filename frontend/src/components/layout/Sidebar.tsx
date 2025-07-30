import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DEPARTMENTS } from '../../data/departments';
import { IconComponent } from '../icons/IconComponent';
import { ChevronRight, Home, BarChart3, FileText } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Filtrar departamentos baseado nas permissões do usuário
  const allowedDepartments = DEPARTMENTS.filter(dept => {
    if (user?.permissions?.includes('all_departments')) return true;
    return user?.permissions?.includes(dept.id);
  });

  const handleDepartmentClick = (deptId: string) => {
    setSelectedDepartment(selectedDepartment === deptId ? null : deptId);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {/* Dashboard Link */}
            <div className="mb-6">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-900 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <Home size={18} className="text-blue-600" />
                <span>Dashboard Principal</span>
              </button>
            </div>

            {/* Departments */}
            <div className="space-y-1">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Departamentos
              </h3>
              
              {allowedDepartments.map((department) => (
                <div key={department.id} className="space-y-1">
                  <button
                    onClick={() => handleDepartmentClick(department.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${department.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent name={department.icon} size={16} className="text-white" />
                      </div>
                      <span className="font-medium">{department.name}</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        selectedDepartment === department.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Department Applications */}
                  {selectedDepartment === department.id && (
                    <div className="ml-4 space-y-1">
                      {/* Applications */}
                      {department.applications.map((app) => (
                        <button
                          key={app.id}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <IconComponent name={app.icon} size={14} className="text-gray-400" />
                          <span>{app.name}</span>
                        </button>
                      ))}
                      
                      {/* Reports */}
                      {department.reports.length > 0 && (
                        <>
                          <div className="px-4 py-2">
                            <div className="flex items-center space-x-2">
                              <FileText size={14} className="text-gray-400" />
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Relatórios
                              </span>
                            </div>
                          </div>
                          {department.reports.map((report) => (
                            <button
                              key={report.id}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <BarChart3 size={14} className="text-gray-400" />
                              <span>{report.name}</span>
                              <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                                report.type === 'dashboard' ? 'bg-green-100 text-green-800' :
                                report.type === 'pdf' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {report.type.toUpperCase()}
                              </span>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};