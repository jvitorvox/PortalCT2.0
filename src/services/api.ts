import { API_CONFIG, STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/helpers';
import type { User, Department, ApiResponse, PaginatedResponse } from '../types';

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = storage.get(STORAGE_KEYS.token);

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Métodos de autenticação
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async validateToken(): Promise<ApiResponse<User>> {
    return this.request('/auth/validate');
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Métodos de usuário
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/users/me');
  }

  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Métodos de departamentos
  async getDepartments(): Promise<ApiResponse<Department[]>> {
    return this.request('/departments');
  }

  async getDepartment(id: string): Promise<ApiResponse<Department>> {
    return this.request(`/departments/${id}`);
  }

  async getDepartmentApplications(id: string): Promise<ApiResponse<any[]>> {
    return this.request(`/departments/${id}/applications`);
  }

  async getDepartmentReports(id: string): Promise<ApiResponse<any[]>> {
    return this.request(`/departments/${id}/reports`);
  }

  async searchDepartments(searchTerm: string): Promise<ApiResponse<Department[]>> {
    return this.request(`/departments/search?searchTerm=${encodeURIComponent(searchTerm)}`);
  }

  // Métodos de relatórios
  async getReports(departmentId?: string): Promise<ApiResponse<any[]>> {
    const endpoint = departmentId ? `/reports?departmentId=${departmentId}` : '/reports';
    return this.request(endpoint);
  }

  async generateReport(reportId: string, params?: any): Promise<ApiResponse<any>> {
    return this.request(`/reports/${reportId}/generate`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Métodos de aplicações
  async getApplications(departmentId?: string): Promise<ApiResponse<any[]>> {
    const endpoint = departmentId ? `/applications?departmentId=${departmentId}` : '/applications';
    return this.request(endpoint);
  }

  async getApplication(id: string): Promise<ApiResponse<any>> {
    return this.request(`/applications/${id}`);
  }

  // Métodos de busca
  async search(query: string, type?: string): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams({ query });
    if (type) params.append('type', type);
    return this.request(`/search?${params.toString()}`);
  }

  // Métodos de configuração
  async getSettings(): Promise<ApiResponse<any>> {
    return this.request('/settings');
  }

  async updateSettings(settings: any): Promise<ApiResponse<any>> {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;