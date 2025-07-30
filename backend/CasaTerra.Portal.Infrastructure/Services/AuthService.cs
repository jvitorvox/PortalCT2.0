using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CasaTerra.Portal.Core.Interfaces;
using CasaTerra.Portal.Core.DTOs;

namespace CasaTerra.Portal.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IActiveDirectoryService _adService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            IActiveDirectoryService adService,
            IConfiguration configuration,
            ILogger<AuthService> logger)
        {
            _adService = adService;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<AuthResultDto?> AuthenticateAsync(string email, string password)
        {
            try
            {
                // Autenticar via Active Directory
                var isAuthenticated = await _adService.AuthenticateUserAsync(email, password);
                if (!isAuthenticated)
                {
                    _logger.LogWarning("Falha na autenticação AD para usuário: {Email}", email);
                    return null;
                }

                // Obter informações do usuário do AD
                var user = await _adService.GetUserInfoAsync(email);
                if (user == null)
                {
                    _logger.LogWarning("Usuário não encontrado no AD: {Email}", email);
                    return null;
                }

                // Obter permissões do usuário
                user.Permissions = await _adService.GetUserPermissionsAsync(email);

                // Gerar token JWT
                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();

                _logger.LogInformation("Autenticação bem-sucedida para usuário: {Email}", email);

                return new AuthResultDto
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    User = user,
                    ExpiresAt = DateTime.UtcNow.AddHours(8) // Token válido por 8 horas
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante autenticação do usuário: {Email}", email);
                return null;
            }
        }

        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            try
            {
                var user = await _adService.GetUserInfoAsync(email);
                if (user != null)
                {
                    user.Permissions = await _adService.GetUserPermissionsAsync(email);
                }
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar usuário: {Email}", email);
                return null;
            }
        }

        public async Task<AuthResultDto?> RefreshTokenAsync(string refreshToken)
        {
            try
            {
                // Em uma implementação real, você validaria o refresh token
                // contra um banco de dados ou cache
                
                // Por simplicidade, retornamos null aqui
                // Implementação completa requereria armazenamento de refresh tokens
                
                _logger.LogInformation("Refresh token solicitado");
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante refresh do token");
                return null;
            }
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Token inválido");
                return false;
            }
        }

        public async Task<bool> RevokeTokenAsync(string token)
        {
            try
            {
                // Em uma implementação real, você adicionaria o token a uma blacklist
                _logger.LogInformation("Token revogado");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao revogar token");
                return false;
            }
        }

        private string GenerateJwtToken(UserDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("department", user.Department)
            };

            // Adicionar permissões como claims
            foreach (var permission in user.Permissions)
            {
                claims.Add(new Claim("permission", permission));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(8),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
    }
}