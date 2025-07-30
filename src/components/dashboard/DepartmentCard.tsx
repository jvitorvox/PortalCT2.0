import React from 'react';
import { Department } from '../../data/departments';
import { 
  Building2, Users, DollarSign, FileText, Shield, Briefcase, 
  HeadphonesIcon, TrendingUp, Calculator, UserCheck, BarChart3, 
  Crown, Target, Wrench, MapPin, FileCheck, Package, Hammer, 
  Clipboard, Map, HandHeart 
} from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

const iconMap = {
  Building2,
  Users,
  DollarSign,
  FileText,
  Shield,
  Briefcase,
  HeadphonesIcon,
  TrendingUp,
  Calculator,
  UserCheck,
  BarChart3,
  Crown,
  Target,
  Wrench,
  MapPin,
  FileCheck,
  Package,
  Hammer,
  Clipboard,
  Map,
  HandHeart
};

const colorMap = {
  blue: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
  green: 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100',
  purple: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
  orange: 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100',
  gray: 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100',
  indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
  teal: 'text-teal-600 bg-teal-50 border-teal-200 hover:bg-teal-100',
  red: 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100',
  yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
  pink: 'text-pink-600 bg-pink-50 border-pink-200 hover:bg-pink-100',
  cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
  amber: 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100',
  lime: 'text-lime-600 bg-lime-50 border-lime-200 hover:bg-lime-100',
  slate: 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100',
  stone: 'text-stone-600 bg-stone-50 border-stone-200 hover:bg-stone-100',
  emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
  violet: 'text-violet-600 bg-violet-50 border-violet-200 hover:bg-violet-100',
  sky: 'text-sky-600 bg-sky-50 border-sky-200 hover:bg-sky-100',
  rose: 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100',
  fuchsia: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200 hover:bg-fuchsia-100'
};

export function DepartmentCard({ department }: DepartmentCardProps) {
  const IconComponent = iconMap[department.icon as keyof typeof iconMap] || Building2;
  const colorClasses = colorMap[department.color as keyof typeof colorMap] || colorMap.blue;

  const handleClick = () => {
    // Aqui você pode implementar a navegação para o departamento
    console.log(`Acessando departamento: ${department.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${colorClasses}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm leading-tight mb-1">
            {department.name}
          </h3>
          <p className="text-xs opacity-75 line-clamp-2">
            {department.description}
          </p>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs opacity-75">
        <span>{department.applications.length} apps</span>
        <span>{department.reports.length} relatórios</span>
      </div>
    </div>
  );
}