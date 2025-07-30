export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  permissions: string[];
  avatar?: string;
}

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

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}