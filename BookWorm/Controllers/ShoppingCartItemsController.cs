using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartItemsController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;

        public ShoppingCartItemsController(BookWormDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("item/{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> IsThereShoppingCartItem(int bookId, int shoppingCartId)
        {
            var book = await context.Books.SingleOrDefaultAsync(b => b.Id == bookId);
            var shoppingCart = await context.ShoppingCarts.SingleOrDefaultAsync(c => c.Id == shoppingCartId);
            
            if (book == null || shoppingCart == null)
                return NotFound("There are no book or shopping cart with specified ids.");

            var shoppingCartItem = await context.ShoppingCartItems.SingleOrDefaultAsync(ci => ci.BookId == bookId && ci.ShoppingCartId == shoppingCartId);

            if (shoppingCartItem == null)
                return Ok(false);
            else
                return Ok(true);
        }

        [HttpGet("{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> GetShoppingCartItem(int bookId, int shoppingCartId)
        {
            var shoppingCartItem = await context.ShoppingCartItems.SingleOrDefaultAsync(ci => ci.BookId == bookId && ci.ShoppingCartId == shoppingCartId);

            if (shoppingCartItem == null)
                return NotFound("There is no shoppingCartItem for specified queries.");

            var shoppingCartItemResource = mapper.Map<ShoppingCartItem, ShoppingCartItemResource>(shoppingCartItem);
            return Ok(shoppingCartItemResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateShoppingCartItem([FromBody] ShoppingCartItemResource shoppingCartItemResource)
        {
            var shoppingCartItem = mapper.Map<ShoppingCartItemResource, ShoppingCartItem>(shoppingCartItemResource);

            context.ShoppingCartItems.Add(shoppingCartItem);
            await context.SaveChangesAsync();

            shoppingCartItem = await context.ShoppingCartItems.SingleOrDefaultAsync(c => c.Id == shoppingCartItem.Id);

            var result = mapper.Map<ShoppingCartItem, ShoppingCartItemResource>(shoppingCartItem);
            return Ok(result);
        }

        [HttpPut("{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> UpdateShoppingCartItem(int bookId, int shoppingCartId, [FromBody] ShoppingCartItemResource shoppingCartItemResource)
        {
            var shoppingCartItem = await context.ShoppingCartItems.SingleOrDefaultAsync(ci => ci.BookId == bookId && ci.ShoppingCartId == shoppingCartId);

            if (shoppingCartItem == null)
                return NotFound();

            mapper.Map(shoppingCartItemResource, shoppingCartItem);
            context.SaveChanges();

            return Ok(mapper.Map<ShoppingCartItem, ShoppingCartItemResource>(shoppingCartItem));
        }
    }
}



