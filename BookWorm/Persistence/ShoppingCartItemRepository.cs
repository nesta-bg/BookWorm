using BookWorm.Core;
using BookWorm.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public class ShoppingCartItemRepository : IShoppingCartItemRepository
    {
        private readonly BookWormDbContext context;

        public ShoppingCartItemRepository(BookWormDbContext context)
        {
            this.context = context;
        }

        public async Task<List<ShoppingCartItem>> GetShoppingCartItemsByCartId(int shoppingCartId)
        {
            return await context.ShoppingCartItems
                .Where(a => a.ShoppingCartId == shoppingCartId)
                .ToListAsync();
        }

        public async Task<ShoppingCartItem> GetShoppingCartItemByCartId(int shoppingCartId)
        {
            return await context.ShoppingCartItems
                .SingleOrDefaultAsync(c => c.Id == shoppingCartId);
        }

        public async Task<ShoppingCartItem> GetShoppingCartItemByCartIdAndProductId(int bookId, int shoppingCartId)
        {
            return await context.ShoppingCartItems
                .SingleOrDefaultAsync(ci => ci.BookId == bookId && ci.ShoppingCartId == shoppingCartId);
        }

        public void AddShoppingCartItem(ShoppingCartItem item)
        {
            context.ShoppingCartItems
                .Add(item);
        }

        public void RemoveShoppingCartItem(ShoppingCartItem item)
        {
            context.ShoppingCartItems
                .Remove(item);
        }
    }
}
