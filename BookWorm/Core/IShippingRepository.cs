using BookWorm.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Core
{
    public interface IShippingRepository
    {
        Task<List<Shipping>> GetAllShippings();

        Task<Shipping> GetShippingById(int id);

        Task<Shipping> GetShippingByIdWithCartAndProducts(int id);

        Task<List<Shipping>> GetShippingsByUser(string userId);

        void AddShipping(Shipping shipping);
    }
}
