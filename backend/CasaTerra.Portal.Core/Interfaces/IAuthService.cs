using CasaTerra.Portal.Core.DTOs;

namespace CasaTerra.Portal.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultDto?> AuthenticateAsync(string email, string password);
        Task<UserDto?> GetUserByEmailAsync(string email);
        Task<AuthResultDto?> RefreshTokenAsync(string refreshToken);
        Task<bool> ValidateTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}