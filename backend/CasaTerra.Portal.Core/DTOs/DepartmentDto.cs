namespace CasaTerra.Portal.Core.DTOs
{
    public class DepartmentDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public List<ApplicationDto> Applications { get; set; } = new();
        public List<ReportDto> Reports { get; set; } = new();
        public bool HasAccess { get; set; }
    }

    public class ApplicationDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime LastUpdated { get; set; }
    }

    public class ReportDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // dashboard, pdf, excel
        public bool IsActive { get; set; }
        public DateTime LastGenerated { get; set; }
    }
}