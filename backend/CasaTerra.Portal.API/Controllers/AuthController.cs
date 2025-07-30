using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CasaTerra.Portal.Core.Interfaces;
using CasaTerra.Portal.Core.DTOs;

namespace CasaTerra.Portal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        /// <summary>
        /// Autentica usuário via Active Directory
        /// </summary>
        /// <param name="loginDto">Credenciais do usuário</param>
        /// <returns>Token JWT e informações do usuário</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                _logger.LogInformation("Tentativa de login para usuário: {Email}", loginDto.Email);

                var authResult = await _authService.AuthenticateAsync(loginDto.Email, loginDto.Password);
                
                if (authResult == null)
                {
                    _logger.LogWarning("Falha na autenticação para usuário: {Email}", loginDto.Email);
                    return Unauthorized(new { message = "Credenciais inválidas" });
                }

                _logger.LogInformation("Login bem-sucedido para usuário: {Email}", loginDto.Email);
                
                return Ok(new
                {
                    token = authResult.Token,
                    user = authResult.User,
                    expiresAt = authResult.ExpiresAt
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante autenticação do usuário: {Email}", loginDto.Email);
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Valida token JWT
        /// </summary>
        /// <returns>Informações do usuário autenticado</returns>
        [HttpGet("validate")]
        [Authorize]
        public async Task<IActionResult> ValidateToken()
        {
            try
            {
                var userEmail = User.Identity?.Name;
                if (string.IsNullOrEmpty(userEmail))
                {
                    return Unauthorized();
                }

                var user = await _authService.GetUserByEmailAsync(userEmail);
                if (user == null)
                {
                    return Unauthorized();
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante validação do token");
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Logout do usuário
        /// </summary>
        /// <returns>Confirmação de logout</returns>
        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            try
            {
                var userEmail = User.Identity?.Name;
                _logger.LogInformation("Logout realizado para usuário: {Email}", userEmail);
                
                // Em uma implementação real, você poderia invalidar o token
                // adicionando-o a uma blacklist ou usando refresh tokens
                
                return Ok(new { message = "Logout realizado com sucesso" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante logout");
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Refresh do token JWT
        /// </summary>
        /// <param name="refreshTokenDto">Token de refresh</param>
        /// <returns>Novo token JWT</returns>
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var authResult = await _authService.RefreshTokenAsync(refreshTokenDto.RefreshToken);
                
                if (authResult == null)
                {
                    return Unauthorized(new { message = "Token de refresh inválido" });
                }

                return Ok(new
                {
                    token = authResult.Token,
                    refreshToken = authResult.RefreshToken,
                    expiresAt = authResult.ExpiresAt
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante refresh do token");
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }
    }
}