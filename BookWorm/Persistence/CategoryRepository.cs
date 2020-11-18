using BookWorm.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly BookWormDbContext context;

        public CategoryRepository(BookWormDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await context.Categories
                .ToListAsync();
        }
    }
}
