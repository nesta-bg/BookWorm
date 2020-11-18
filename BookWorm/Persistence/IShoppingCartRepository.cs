using BookWorm.Models;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart> GetShoppingCartByCartId(int shoppingCartId);

        Task<ShoppingCart> GetShoppingCartByCartIdWithItems(int shoppingCartId);

        void AddShoppingCart(ShoppingCart shoppingCart);
    }
}
