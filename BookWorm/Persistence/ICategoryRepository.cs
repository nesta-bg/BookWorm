using BookWorm.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategories();
    }
}
