import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconComponentProps {
  name: string;
  size?: number;
  className?: string;
}

export const IconComponent: React.FC<IconComponentProps> = ({ 
  name, 
  size = 20, 
  className = '' 
}) => {
  const IconElement = (LucideIcons as any)[name];
  
  if (!IconElement) {
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }
  
  return <IconElement size={size} className={className} />;
};