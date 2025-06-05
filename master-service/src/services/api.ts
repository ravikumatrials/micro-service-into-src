
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-gateway.com' 
  : 'http://localhost:8000';

// API service for communicating with other microservices
export class ApiService {
  private static instance: ApiService;
  
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Attendance Service Communication
  async getAttendanceData(employeeId: string) {
    const response = await fetch(`${API_BASE_URL}/attendance-service/employee/${employeeId}`);
    return response.json();
  }

  // Dashboard Service Communication
  async sendEmployeeUpdate(employeeData: any) {
    const response = await fetch(`${API_BASE_URL}/dashboard-service/employee-update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData)
    });
    return response.json();
  }

  // Reports Service Communication
  async requestEmployeeReport(filters: any) {
    const response = await fetch(`${API_BASE_URL}/reports-service/employee-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    return response.json();
  }

  // Master Service Internal APIs
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/master-service/projects`);
    return response.json();
  }

  async createProject(projectData: any) {
    const response = await fetch(`${API_BASE_URL}/master-service/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    return response.json();
  }

  async updateProject(id: string, projectData: any) {
    const response = await fetch(`${API_BASE_URL}/master-service/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    return response.json();
  }

  async deleteProject(id: string) {
    const response = await fetch(`${API_BASE_URL}/master-service/projects/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
}

export const apiService = ApiService.getInstance();
