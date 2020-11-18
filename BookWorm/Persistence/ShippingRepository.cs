using BookWorm.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public class ShippingRepository : IShippingRepository
    {
        private readonly BookWormDbContext context;

        public ShippingRepository(BookWormDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Shipping>> GetAllShippings()
        {
            return await context.Shippings
                .Include(sh => sh.AppUser)
                .Include(sh => sh.ShoppingCart)
                .ToListAsync();
        }

        public async Task<Shipping> GetShippingById(int id)
        {
            return await context.Shippings
                .SingleOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Shipping> GetShippingByIdWithCartAndProducts(int id)
        {
            return await context.Shippings
                .Where(s => s.Id == id)
                .Include(sh => sh.ShoppingCart)
                .ThenInclude(sc => sc.ShoppingCartItems)
                .ThenInclude(sci => sci.Book)
                .SingleOrDefaultAsync();
        }

        public async Task<List<Shipping>> GetShippingsByUser(string userId)
        {
            return await context.Shippings
                .Where(s => s.AppUserId == userId)
                .Include(sh => sh.AppUser)
                .Include(sh => sh.ShoppingCart)
                .ToListAsync();
        }

        public void AddShipping(Shipping shipping)
        {
            context.Shippings
                .Add(shipping);
        }
    }
}
