using BookWorm.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.Persistence
{
    public class BookWormDbContext : IdentityDbContext
    {
        public DbSet<AppUser> AppUsers { get; set; }

        public BookWormDbContext(DbContextOptions<BookWormDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
            
    }
}
