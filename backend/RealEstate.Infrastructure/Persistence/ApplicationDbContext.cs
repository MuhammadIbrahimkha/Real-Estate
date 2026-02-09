using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RealEstate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }


        public DbSet<Property> Properties => Set<Property>();
        public DbSet<PropertyImage> Images => Set<PropertyImage>();



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // This automatically picks up the 'Configurations' we will write next

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

       

            base.OnModelCreating(modelBuilder);
        }



    }
}
