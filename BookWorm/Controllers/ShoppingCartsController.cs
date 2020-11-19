using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Core.Models;
using BookWorm.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IShoppingCartRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ShoppingCartsController(
            IMapper mapper, 
            IShoppingCartRepository repository,
            IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
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
            await unitOfWork.CompleteAsync();

            shoppingCart = await repository.GetShoppingCartByCartId(shoppingCart.Id);


            return Ok(shoppingCart.Id);
        }
    }
}
