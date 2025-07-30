import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getDepartmentsByPermissions } from '../../data/departments';
import { DepartmentCard } from './DepartmentCard';

export function DepartmentGrid() {
  const { user } = useAuth();
  
  if (!user) return null;

  const userDepartments = getDepartmentsByPermissions(user.permissions);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Seus Departamentos
        </h2>
        <p className="text-gray-600">
          Você tem acesso aos seguintes departamentos baseado em suas permissões:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {userDepartments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>

      {userDepartments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Nenhum departamento disponível para suas permissões atuais.
          </p>
        </div>
      )}
    </div>
  );
}