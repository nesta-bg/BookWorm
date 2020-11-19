using BookWorm.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Core
{
    public interface IShoppingCartItemRepository
    {
        Task<List<ShoppingCartItem>> GetShoppingCartItemsByCartId(int shoppingCartId);

        Task<ShoppingCartItem> GetShoppingCartItemByCartId(int shoppingCartId);

        Task<ShoppingCartItem> GetShoppingCartItemByCartIdAndProductId(int bookId, int shoppingCartId);

        void AddShoppingCartItem(ShoppingCartItem item);

        void RemoveShoppingCartItem(ShoppingCartItem item);
    }
}
