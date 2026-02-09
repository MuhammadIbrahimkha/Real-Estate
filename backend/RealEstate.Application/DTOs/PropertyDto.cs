namespace RealEstate.Application.DTOs;

public class PropertyDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Address { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty; // From Enum

    public List<string> ImageUrls { get; set; } = new();
    public string? WhatsappNumber { get; set; }
}