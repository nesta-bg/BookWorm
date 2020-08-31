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

        public ShoppingCartsController(BookWormDbContext context)
        {
            this.context = context;
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
