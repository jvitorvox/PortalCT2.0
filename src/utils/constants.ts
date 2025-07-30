export const APP_CONFIG = {
  name: 'Portal Casa & Terra',
  version: '1.0.0',
  description: 'Sistema corporativo centralizado',
  author: 'Casa & Terra',
  repository: 'https://github.com/sua-empresa/casa-terra-portal'
};

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  retries: 3
};

export const STORAGE_KEYS = {
  user: 'casa-terra-user',
  token: 'casa-terra-token',
  refreshToken: 'casa-terra-refresh-token',
  theme: 'casa-terra-theme',
  language: 'casa-terra-language'
};

export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  departments: '/departments',
  profile: '/profile',
  settings: '/settings'
};

export const PERMISSIONS = {
  ALL_DEPARTMENTS: 'all_departments',
  ADMIN: 'admin',
  USER: 'user'
};

export const COLORS = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#06B6D4'
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};