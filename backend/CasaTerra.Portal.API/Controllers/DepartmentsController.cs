using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CasaTerra.Portal.Core.Interfaces;
using CasaTerra.Portal.Core.DTOs;

namespace CasaTerra.Portal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;
        private readonly ILogger<DepartmentsController> _logger;

        public DepartmentsController(IDepartmentService departmentService, ILogger<DepartmentsController> logger)
        {
            _departmentService = departmentService;
            _logger = logger;
        }

        /// <summary>
        /// Obtém todos os departamentos disponíveis para o usuário
        /// </summary>
        /// <returns>Lista de departamentos</returns>
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            try
            {
                var userEmail = User.Identity?.Name;
                _logger.LogInformation("Buscando departamentos para usuário: {Email}", userEmail);

                var departments = await _departmentService.GetDepartmentsByUserAsync(userEmail);
                
                return Ok(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar departamentos");
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Obtém departamento específico por ID
        /// </summary>
        /// <param name="id">ID do departamento</param>
        /// <returns>Detalhes do departamento</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(string id)
        {
            try
            {
                var userEmail = User.Identity?.Name;
                _logger.LogInformation("Buscando departamento {Id} para usuário: {Email}", id, userEmail);

                var department = await _departmentService.GetDepartmentByIdAsync(id, userEmail);
                
                if (department == null)
                {
                    return NotFound(new { message = "Departamento não encontrado ou sem permissão de acesso" });
                }

                return Ok(department);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar departamento {Id}", id);
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Obtém aplicações de um departamento
        /// </summary>
        /// <param name="id">ID do departamento</param>
        /// <returns>Lista de aplicações</returns>
        [HttpGet("{id}/applications")]
        public async Task<IActionResult> GetDepartmentApplications(string id)
        {
            try
            {
                var userEmail = User.Identity?.Name;
                _logger.LogInformation("Buscando aplicações do departamento {Id} para usuário: {Email}", id, userEmail);

                var applications = await _departmentService.GetDepartmentApplicationsAsync(id, userEmail);
                
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar aplicações do departamento {Id}", id);
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Obtém relatórios de um departamento
        /// </summary>
        /// <param name="id">ID do departamento</param>
        /// <returns>Lista de relatórios</returns>
        [HttpGet("{id}/reports")]
        public async Task<IActionResult> GetDepartmentReports(string id)
        {
            try
            {
                var userEmail = User.Identity?.Name;
                _logger.LogInformation("Buscando relatórios do departamento {Id} para usuário: {Email}", id, userEmail);

                var reports = await _departmentService.GetDepartmentReportsAsync(id, userEmail);
                
                return Ok(reports);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar relatórios do departamento {Id}", id);
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Busca departamentos por termo
        /// </summary>
        /// <param name="searchTerm">Termo de busca</param>
        /// <returns>Lista de departamentos filtrados</returns>
        [HttpGet("search")]
        public async Task<IActionResult> SearchDepartments([FromQuery] string searchTerm)
        {
            try
            {
                var userEmail = User.Identity?.Name;
                _logger.LogInformation("Buscando departamentos com termo '{SearchTerm}' para usuário: {Email}", searchTerm, userEmail);

                var departments = await _departmentService.SearchDepartmentsAsync(searchTerm, userEmail);
                
                return Ok(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar departamentos com termo '{SearchTerm}'", searchTerm);
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }
    }
}