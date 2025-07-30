import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data - em produção seria integrado com Active Directory
const MOCK_USERS: Record<string, User> = {
  'admin@casaterra.com': {
    id: '1',
    name: 'Administrador Sistema',
    email: 'admin@casaterra.com',
    department: 'TI',
    permissions: ['all_departments'],
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'financeiro@casaterra.com': {
    id: '2',
    name: 'João Silva',
    email: 'financeiro@casaterra.com',
    department: 'Financeiro',
    permissions: ['financeiro', 'administrativo'],
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'rh@casaterra.com': {
    id: '3',
    name: 'Maria Santos',
    email: 'rh@casaterra.com',
    department: 'RH',
    permissions: ['rh', 'administrativo'],
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('casaterra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simular chamada para Active Directory
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser && password === '123456') {
      setUser(mockUser);
      localStorage.setItem('casaterra_user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('casaterra_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};