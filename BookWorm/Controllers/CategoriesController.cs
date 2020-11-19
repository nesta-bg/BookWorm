using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Core.Models;
using BookWorm.Core;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly IMapper mapper;
        private readonly ICategoryRepository repository;

        public CategoriesController(IMapper mapper, ICategoryRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryResource>> GetCategories()
        {
            var categories = await repository.GetAllCategories();

            return mapper.Map<List<Category>, List<CategoryResource>>(categories);

        }
    }
}
