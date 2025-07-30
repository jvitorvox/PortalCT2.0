namespace CasaTerra.Portal.Core.DTOs
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public List<string> Permissions { get; set; } = new();
        public string? Avatar { get; set; }
        public DateTime LastLogin { get; set; }
        public bool IsActive { get; set; }
    }

    public class UserPermissionDto
    {
        public string UserId { get; set; } = string.Empty;
        public string DepartmentId { get; set; } = string.Empty;
        public string Permission { get; set; } = string.Empty;
        public DateTime GrantedAt { get; set; }
        public string GrantedBy { get; set; } = string.Empty;
    }
}