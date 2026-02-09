using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstate.Application.DTOs;
using RealEstate.Application.Interfaces;
using RealEstate.Application.Services;
using System.Security.Claims;

namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            this.propertyService = propertyService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(
    [FromQuery] string? title,
    [FromQuery] string? type,
    [FromQuery] decimal? min,
    [FromQuery] decimal? max,
    [FromQuery] int pageNumber = 1,
    [FromQuery] int pageSize = 10)
        {
            var result = await propertyService.SearchPropertiesAsync(title, type, min, max, pageNumber, pageSize);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var property = await propertyService.GetPropertyByIdAsync(id);

            if (property == null)
            {
                return NotFound(new { Message = "Property not found." });
            }

            return Ok(property);
        }


        [HttpGet("my-listings")]
        [Authorize]
        public async Task<IActionResult> GetMyProperties()
        {
            // 🚀 Extract the User ID from the JWT claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            // Call service to get ONLY this user's items
            var result = await propertyService.GetPropertiesByUserIdAsync(userId);

            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreatePropertyDto dto)
        {
            // The "User" object is built-in to the Controller. 
            // It contains the "Claims" from your JWT.
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            // Now pass this userId into your service method
            var result = await propertyService.CreatePropertyAsync(dto, userId);

            return CreatedAtAction(nameof(Search), new { id = result.Id }, result);
        }

        [HttpPost("{id}/images")]
        [Authorize]
        public async Task<IActionResult> UploadImage([FromRoute] int id, [FromForm] PropertyImageUploadDto dto)
        {
            // Important: Assign the ID from the route to the DTO
            dto.PropertyId = id;

            // Call the service
            var imageUrl = await propertyService.UploadPropertyImageAsync(dto);

            return Ok(new { Message = "Uploaded!", Url = imageUrl });
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePropertyDto dto)
        {
            // 1. Get the User ID from the JWT Claims
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            // 2. Call the service to perform the update
            var success = await propertyService.UpdatePropertyAsync(id, dto, userId);

            if (!success) return NotFound(new { Message = "Property not found or you don't have permission." });

            return Ok(new { Message = "Property updated successfully" });
        }



        [HttpDelete("{id}")] // URL will look like: api/properties/5
        [Authorize]          // Requires a valid JWT
        public async Task<IActionResult> Delete(int id)
        {
            // 1. Extract the User ID from the logged-in token
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            // 2. Call the service
            var result = await propertyService.DeletePropertyAsync(id, userId);

            if (!result) return NotFound();

            return Ok(new { Message = "Property deleted successfully" });
        }
    }
}

