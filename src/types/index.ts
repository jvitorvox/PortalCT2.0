export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  permissions: string[];
  avatar?: string;
  lastLogin?: Date;
  isActive?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  applications: Application[];
  reports: Report[];
  hasAccess?: boolean;
}

export interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  isActive?: boolean;
  lastUpdated?: Date;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'dashboard' | 'pdf' | 'excel';
  isActive?: boolean;
  lastGenerated?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}