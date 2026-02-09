using AutoMapper;
using Microsoft.Extensions.Logging;
using RealEstate.Application.DTOs;
using RealEstate.Application.Interfaces;
using RealEstate.Domain.Entities;
using RealEstate.Domain.Interfaces;

namespace RealEstate.Application.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository repository;
        private readonly IFileService fileService;
        private readonly IMapper mapper;
        private readonly ILogger<PropertyService> logger;

  

        public PropertyService(IPropertyRepository repository,  IFileService fileService, IMapper mapper, ILogger<PropertyService> logger)
        {
            this.repository = repository;
            this.fileService = fileService;
            this.mapper = mapper;
            this.logger = logger;
        }


        public async Task<PropertyDto?> GetPropertyByIdAsync(int id)
        {
            // 1. Call the repository instead of 'context'
            var property = await repository.GetPropertyWithDetailsAsync(id);

            // 2. Safety check
            if (property == null) return null;

            // 3. Map to DTO and return
            return mapper.Map<PropertyDto>(property);
        }


        public async Task<PagedResultDto<PropertyDto>> SearchPropertiesAsync(
     string? title,
     string? type,
     decimal? min,
     decimal? max,
     int pageNumber,
     int pageSize)
        {
            var properties = await repository.GetPropertiesByLocationAsync(title, type, min, max);

            var totalCount = properties.Count();

            var pagedItems = properties
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var dtos = mapper.Map<IEnumerable<PropertyDto>>(pagedItems);

            return new PagedResultDto<PropertyDto>
            {
                Items = dtos,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }



        public async Task<IEnumerable<PropertyDto>> GetPropertiesByUserIdAsync(string userId)
        {
            // 1. Get the properties from repository
            var properties = await repository.GetByUserIdAsync(userId);

            // 2. Map them to DTOs for the frontend
            return mapper.Map<IEnumerable<PropertyDto>>(properties);
        }


        public async Task<PropertyDto> CreatePropertyAsync(CreatePropertyDto dto, string userId)
        {
            // 1. Map the DTO to the Property entity
            var entity = mapper.Map<Property>(dto);

            // 2. 👈 Assign the logged-in User's ID to the property
            // This ensures the property "belongs" to the user who created it
            entity.CreatedByUserId = userId;

            // 3. Save the entity to the database
            await repository.AddAsync(entity);
            await repository.SaveChangesAsync();

            // 4. Return the DTO (AutoMapper handles the conversion back)
            return mapper.Map<PropertyDto>(entity);
        }

        public async Task<string> UploadPropertyImageAsync(PropertyImageUploadDto dto)
        {
            // 1. If the user wants this new image to be primary, clear the old one first
            if (dto.IsPrimary)
            {
                await repository.RemovePrimaryStatusAsync(dto.PropertyId);
            }

            await repository.SaveChangesAsync();

            // 2. Save the physical file
            var filePath = await fileService.SaveFileAsync(dto.File, "properties");

            // 3. Create the entity
            var imageEntity = new PropertyImage
            {
                Url = filePath,
                PropertyId = dto.PropertyId,
                IsPrimary = dto.IsPrimary
            };

            // 4. Save to database
            await repository.AddImageAsync(imageEntity);
            await repository.SaveChangesAsync();

            return filePath;
        }

        public async Task<bool> UpdatePropertyAsync(int propertyId, UpdatePropertyDto dto, string userId)
        {
            var property = await repository.GetByIdAsync(propertyId);

            if (property == null) return false;

            if (property.CreatedByUserId != userId)
            {
                throw new UnauthorizedAccessException("You cannot edit a property you do not own.");
            }

            // 🚩 LINE 143: This will fail if the MappingProfile is missing the map!
            mapper.Map(dto, property);

            await repository.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeletePropertyAsync(int propertyId, string userId)
        {
            // 1. Get the property from the database
            var property = await repository.GetByIdAsync(propertyId);

            // 2. Check if it exists
            if (property == null) return false;

            // 3. 🛡️ SECURITY CHECK: The most important part for your portfolio!
            // We check if the 'CreatedByUserId' in the DB matches the 'userId' from the JWT
            if (property.CreatedByUserId != userId)
            {
                logger.LogWarning("Unauthorized delete attempt by User {UserId} on Property {PropertyId}", userId, propertyId);
                throw new UnauthorizedAccessException("You do not own this property.");
            }

            // 4. Delete the property
            await repository.DeleteAsync(property);

            // 5. Save changes to SQL
            await repository.SaveChangesAsync();

            return true;
        }


    }
}