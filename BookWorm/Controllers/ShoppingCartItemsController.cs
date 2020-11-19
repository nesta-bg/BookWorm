using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Core.Models;
using BookWorm.Core;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartItemsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IBookRepository bookRepository;
        private readonly IShoppingCartItemRepository shoppingCartItemRepository;
        private readonly IShoppingCartRepository shoppingCartRepository;
        private readonly IUnitOfWork unitOfWork;

        public ShoppingCartItemsController(
            IMapper mapper,
            IBookRepository bookRepository,
            IShoppingCartItemRepository shoppingCartItemRepository,
            IShoppingCartRepository shoppingCartRepository,
            IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.bookRepository = bookRepository;
            this.shoppingCartItemRepository = shoppingCartItemRepository;
            this.shoppingCartRepository = shoppingCartRepository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("item/{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> IsThereShoppingCartItem(int bookId, int shoppingCartId)
        {
            var book = await bookRepository.GetBookById(bookId);
            var shoppingCart = await shoppingCartRepository.GetShoppingCartByCartId(shoppingCartId);

            if (book == null || shoppingCart == null)
                return NotFound("There are no book or shopping cart with specified ids.");

            var shoppingCartItem = await shoppingCartItemRepository.GetShoppingCartItemByCartIdAndProductId(bookId, shoppingCartId);

            if (shoppingCartItem == null)
                return Ok(false);
            else
                return Ok(true);
        }

        [HttpGet("{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> GetShoppingCartItem(int bookId, int shoppingCartId)
        {
            var shoppingCartItem = await shoppingCartItemRepository.GetShoppingCartItemByCartIdAndProductId(bookId, shoppingCartId);

            if (shoppingCartItem == null)
                return NotFound("There is no shoppingCartItem for specified queries.");

            var shoppingCartItemResource = mapper.Map<ShoppingCartItem, ShoppingCartItemResource>(shoppingCartItem);
            return Ok(shoppingCartItemResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateShoppingCartItem([FromBody] ShoppingCartItemResource shoppingCartItemResource)
        {
            var shoppingCartItem = mapper.Map<ShoppingCartItemResource, ShoppingCartItem>(shoppingCartItemResource);

            shoppingCartItemRepository.AddShoppingCartItem(shoppingCartItem);
            await unitOfWork.CompleteAsync();

            shoppingCartItem = await shoppingCartItemRepository.GetShoppingCartItemByCartId(shoppingCartItem.Id);

            var result = mapper.Map<ShoppingCartItem, ShoppingCartItemResource>(shoppingCartItem);
            return Ok(result);
        }

        [HttpPut("{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> UpdateShoppingCartItem(int bookId, int shoppingCartId, [FromBody] ShoppingCartItemResource shoppingCartItemResource)
        {
            var shoppingCartItem = await shoppingCartItemRepository.GetShoppingCartItemByCartIdAndProductId(bookId, shoppingCartId);

            if (shoppingCartItem == null)
                return NotFound();

            mapper.Map(shoppingCartItemResource, shoppingCartItem);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<ShoppingCartItem, ShoppingCartItemResource>(shoppingCartItem));
        }

        [HttpDelete("{bookId}/{shoppingCartId}")]
        public async Task<IActionResult> DeleteShoppingCartItem(int bookId, int shoppingCartId)
        {
            var shoppingCartItem = await shoppingCartItemRepository.GetShoppingCartItemByCartIdAndProductId(bookId, shoppingCartId);

            if (shoppingCartItem == null)
                return NotFound();

            shoppingCartItemRepository.RemoveShoppingCartItem(shoppingCartItem);
            await unitOfWork.CompleteAsync();

            return Ok(shoppingCartItem.ShoppingCartId);
        }

        [HttpDelete("{shoppingCartId}")]
        public async Task<IActionResult> DeleteAllShoppingCartItems(int shoppingCartId)
        {
            var shoppingCartItems = await shoppingCartItemRepository.GetShoppingCartItemsByCartId(shoppingCartId);

            if (shoppingCartItems.Count == 0)
                return NotFound();

            foreach (var item in shoppingCartItems)
            {
                shoppingCartItemRepository.RemoveShoppingCartItem(item);
            }

            await unitOfWork.CompleteAsync();

            return Ok(shoppingCartId);
        }
    }
}



