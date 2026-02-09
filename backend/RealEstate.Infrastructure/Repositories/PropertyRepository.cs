using Microsoft.EntityFrameworkCore;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Enums;
using RealEstate.Domain.Interfaces;
using RealEstate.Infrastructure.Persistence;

namespace RealEstate.Infrastructure.Repositories
{
    public class PropertyRepository : GenericRepository<Property>,IPropertyRepository
    {
        public PropertyRepository(ApplicationDbContext context) : base(context) { }

        public async Task AddImageAsync(PropertyImage image)
        {
            await _context.Set<PropertyImage>().AddAsync(image);
        }

        public async Task<IEnumerable<Property>> GetPropertiesByLocationAsync(
     string? title,
     string? type,
     decimal? min,
     decimal? max)
        {
            var query = _context.Properties
                .Include(p => p.Images)
                .AsQueryable();

            // Title filter
            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(p => p.Title.Contains(title));

            // Min price filter
            if (min.HasValue)
                query = query.Where(p => p.Price >= min.Value);

            //  Max price filter
            if (max.HasValue)
                query = query.Where(p => p.Price <= max.Value);

            //  Type filter (Enum)
            if (!string.IsNullOrWhiteSpace(type))
            {
                if (Enum.TryParse<PropertyType>(type, true, out var parsedType))
                {
                    query = query.Where(p => p.Type == parsedType);
                }
            }

            return await query.ToListAsync();
        }


        public async Task<Property?> GetPropertyWithDetailsAsync(int id)
        {
            // Here we have access to _context or _dbSet
            return await _context.Properties
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Property>> GetByUserIdAsync(string userId)
        {
            // We filter the properties where the CreatedByUserId matches the logged-in user
            return await _context.Properties
                .Include(p => p.Images)
                .Where(p => p.CreatedByUserId == userId)
                .ToListAsync();
        }

        public async Task RemovePrimaryStatusAsync(int propertyId)
        {
            // Find any image for this property that is currently primary
            var primaryImages = await _context.Set<PropertyImage>()
                .Where(img => img.PropertyId == propertyId && img.IsPrimary)
                .ToListAsync();

            // Set them all to false
            foreach (var img in primaryImages)
            {
                img.IsPrimary = false;
            }
        }

        public async Task DeleteAsync(Property entity)
        {
            // This marks the object as 'Deleted' in the Change Tracker
            _context.Properties.Remove(entity);

            // Note: We don't usually call SaveChangesAsync here. 
            // We let the Service call it to keep the transaction together.
            await Task.CompletedTask;
        }


        public async Task<(IEnumerable<Property> items, int totalCount)> GetPagedPropertiesAsync(int pageNumber, int pageSize)
        {
            var query = _context.Properties.AsQueryable();

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize) // 👈 Skip the items we've already seen
                .Take(pageSize)                   // 👈 Take only the amount for this page
                .ToListAsync();

            return (items, totalCount);
        }



    }
}

