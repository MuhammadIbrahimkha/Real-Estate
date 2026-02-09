using RealEstate.Domain.Entities;

namespace RealEstate.Domain.Interfaces
{
    public interface IPropertyRepository : IGenericRepository<Property>
    {
        // Custom method for our advanced search later.
        Task<IEnumerable<Property>> GetPropertiesByLocationAsync(string? search, string? type, decimal? min, decimal? max);


        Task<Property?> GetPropertyWithDetailsAsync(int id);

        Task<IEnumerable<Property>> GetByUserIdAsync(string userId);
        Task AddImageAsync(PropertyImage image);


        // we need to add a way to find and update existing primary images in the database.
        Task RemovePrimaryStatusAsync(int propertyId);

        Task DeleteAsync(Property entity);


    }
}
