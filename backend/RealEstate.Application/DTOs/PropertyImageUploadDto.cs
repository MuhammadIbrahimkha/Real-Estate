using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RealEstate.Application.DTOs
{
    public class PropertyImageUploadDto
    {
        [JsonIgnore]
        public int PropertyId { get; set; }
        public IFormFile File { get; set; } = null!;
        public bool IsPrimary { get; set; }
    }
}
