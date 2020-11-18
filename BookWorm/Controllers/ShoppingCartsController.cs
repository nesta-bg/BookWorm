using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartsController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;
        private readonly IShoppingCartRepository repository;

        public ShoppingCartsController(BookWormDbContext context, IMapper mapper, IShoppingCartRepository repository)
        {
            this.context = context;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet("{shoppingCartId}")]
        public async Task<IActionResult> GetShoppingCart(int shoppingCartId)
        {
            var shoppingCart = await repository.GetShoppingCartByCartIdWithItems(shoppingCartId);

            if (shoppingCart == null)
                return NotFound("There is no shoppingCart for specified query.");

            var shoppingCartResource = mapper.Map<ShoppingCart, ShoppingCartResource>(shoppingCart);
            return Ok(shoppingCartResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateShoppingCart()
        {
            var shoppingCart = new ShoppingCart { DateCreated = DateTime.Now };

            repository.AddShoppingCart(shoppingCart);
            await context.SaveChangesAsync();

            shoppingCart = await repository.GetShoppingCartByCartId(shoppingCart.Id);


            return Ok(shoppingCart.Id);
        }
    }
}
