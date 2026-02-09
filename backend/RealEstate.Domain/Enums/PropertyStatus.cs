using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.Domain.Enums
{
    public enum PropertyStatus
    {
        PendingApproval, // Default when an Agent creates it
        Active,          // When Admin approves it
        Sold,            // Self-explanatory
        Expired          // Listing time is up
    }
}
