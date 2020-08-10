using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;

        public CategoriesController(BookWormDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryResource>> GetCategories()
        {
            var categories = await context.Categories.ToListAsync();

            return mapper.Map<List<Category>, List<CategoryResource>>(categories);

        }
    }
}
