using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartsController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;

        public ShoppingCartsController(BookWormDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("{shoppingCartId}")]
        public async Task<IActionResult> GetShoppingCart(int shoppingCartId)
        {
            var shoppingCart = await context.ShoppingCarts
                .Include(c => c.ShoppingCartItems)
                .ThenInclude(i => i.Book)
                .SingleOrDefaultAsync(c => c.Id == shoppingCartId);

            if (shoppingCart == null)
                return NotFound("There is no shoppingCart for specified query.");

            var shoppingCartResource = mapper.Map<ShoppingCart, ShoppingCartResource>(shoppingCart);
            return Ok(shoppingCartResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateShoppingCart()
        {
            var shoppingCart = new ShoppingCart { DateCreated = DateTime.Now };

            context.ShoppingCarts.Add(shoppingCart);
            await context.SaveChangesAsync();

            shoppingCart = await context.ShoppingCarts.SingleOrDefaultAsync(c => c.Id == shoppingCart.Id);


            return Ok(shoppingCart.Id);
        }
    }
}
