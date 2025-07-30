using CasaTerra.Portal.Core.DTOs;

namespace CasaTerra.Portal.Core.Interfaces
{
    public interface IActiveDirectoryService
    {
        Task<bool> AuthenticateUserAsync(string email, string password);
        Task<UserDto?> GetUserInfoAsync(string email);
        Task<List<string>> GetUserGroupsAsync(string email);
        Task<List<string>> GetUserPermissionsAsync(string email);
        Task<bool> IsUserInGroupAsync(string email, string groupName);
        Task<List<UserDto>> GetUsersInGroupAsync(string groupName);
    }
}