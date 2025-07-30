using CasaTerra.Portal.Core.DTOs;

namespace CasaTerra.Portal.Core.Interfaces
{
    public interface IDepartmentService
    {
        Task<List<DepartmentDto>> GetDepartmentsByUserAsync(string userEmail);
        Task<DepartmentDto?> GetDepartmentByIdAsync(string departmentId, string userEmail);
        Task<List<ApplicationDto>> GetDepartmentApplicationsAsync(string departmentId, string userEmail);
        Task<List<ReportDto>> GetDepartmentReportsAsync(string departmentId, string userEmail);
        Task<List<DepartmentDto>> SearchDepartmentsAsync(string searchTerm, string userEmail);
        Task<List<DepartmentDto>> GetAllDepartmentsAsync();
    }
}