using RealEstate.Application.DTOs;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;
using System.Linq.Expressions;

namespace RealEstate.Application.Interfaces
{
    public interface IPropertyService  
    {
        

        Task<PagedResultDto<PropertyDto>> SearchPropertiesAsync(
        string? title,
        string? type,
        decimal? min,
        decimal? max,
        int pageNumber,
        int pageSize);



        Task<PropertyDto?> GetPropertyByIdAsync(int id);


        Task<PropertyDto> CreatePropertyAsync(CreatePropertyDto dto, string userId);

        Task<IEnumerable<PropertyDto>> GetPropertiesByUserIdAsync(string userId);

        Task<string> UploadPropertyImageAsync(PropertyImageUploadDto dto);

        Task<bool> UpdatePropertyAsync(int propertyId, UpdatePropertyDto dto, string userId);

        Task<bool> DeletePropertyAsync(int propertyId, string userId);
    }
}
