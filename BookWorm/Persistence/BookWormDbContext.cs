﻿using BookWorm.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.Persistence
{
    public class BookWormDbContext : IdentityDbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<AppUser> AppUsers { get; set; }

        public DbSet<ShoppingCart> ShoppingCarts { get; set; }

        public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }

        public DbSet<Shipping> Shippings { get; set; }

        public BookWormDbContext(DbContextOptions<BookWormDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>()
                .Property(b => b.Price)
                .HasColumnType("decimal(8,2)");

            modelBuilder.Entity<Category>()
                .HasAlternateKey(c => c.ValueName);

            modelBuilder.Entity<ShoppingCart>()
                .HasOne(c => c.Shipping)
                .WithOne(s => s.ShoppingCart)
                .HasForeignKey<Shipping>(s => s.ShoppingCartId);

            modelBuilder.Entity<Shipping>()
               .ToTable("Shippings");
        }
            
    }
}
