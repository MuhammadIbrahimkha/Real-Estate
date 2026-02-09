using RealEstate.Domain.Common;
using RealEstate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.Domain.Entities
{
    public class Property : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Address { get; set; } = string.Empty;

        public string? WhatsappNumber { get; set; }
        public PropertyType Type { get; set; }
        public PropertyStatus Status { get; set; } = PropertyStatus.PendingApproval;

        // Relationship
        //public int LocationId { get; set; }
        //public Location? Location { get; set; }

        public List<PropertyImage> Images { get; set; } = new();

        public string CreatedByUserId { get; set; } = string.Empty;
    }
}
