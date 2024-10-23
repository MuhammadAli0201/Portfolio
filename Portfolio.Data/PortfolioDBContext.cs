using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models.Models;

namespace Portfolio.Data
{
    public class PortfolioDBContext : IdentityDbContext<AppUser>
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Image> Images { get; set; }

        public PortfolioDBContext(DbContextOptions<PortfolioDBContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(typeof(PortfolioDBContext).Assembly);
            base.OnModelCreating(builder);
        }
    }
}
