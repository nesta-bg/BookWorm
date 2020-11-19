using BookWorm.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Core
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategories();
    }
}
