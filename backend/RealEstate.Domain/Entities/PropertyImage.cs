using RealEstate.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.Domain.Entities
{
    public class PropertyImage : BaseEntity
    {
        public string Url { get; set; } = string.Empty; // the path to the file.
        public bool IsPrimary { get; set; } // Is this the cover photo


        // Relationship: Every image belongs to one specific Property

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;


    }
}
