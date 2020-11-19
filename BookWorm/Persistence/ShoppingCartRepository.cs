using BookWorm.Core;
using BookWorm.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly BookWormDbContext context;

        public ShoppingCartRepository(BookWormDbContext context)
        {
            this.context = context;
        }

        public async Task<ShoppingCart> GetShoppingCartByCartId(int shoppingCartId)
        {
            return await context.ShoppingCarts
                .SingleOrDefaultAsync(c => c.Id == shoppingCartId);
        }

        public async Task<ShoppingCart> GetShoppingCartByCartIdWithItems(int shoppingCartId)
        {
            return await context.ShoppingCarts
                .Include(c => c.ShoppingCartItems)
                .ThenInclude(i => i.Book)
                .SingleOrDefaultAsync(c => c.Id == shoppingCartId);
        }

        public void AddShoppingCart(ShoppingCart shoppingCart)
        {
            context.ShoppingCarts
                .Add(shoppingCart);
        }
    }
}
