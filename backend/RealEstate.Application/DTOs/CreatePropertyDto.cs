using RealEstate.Domain.Enums;

namespace RealEstate.Application.DTOs;

public class CreatePropertyDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Address { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string? WhatsappNumber { get; set; }
}