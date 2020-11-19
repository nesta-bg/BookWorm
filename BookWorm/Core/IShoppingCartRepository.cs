using BookWorm.Core.Models;
using System.Threading.Tasks;

namespace BookWorm.Core
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart> GetShoppingCartByCartId(int shoppingCartId);

        Task<ShoppingCart> GetShoppingCartByCartIdWithItems(int shoppingCartId);

        void AddShoppingCart(ShoppingCart shoppingCart);
    }
}
