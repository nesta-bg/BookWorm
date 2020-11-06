using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShippingsController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;

        public ShippingsController(BookWormDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateShipping([FromBody] ShippingResource shippingResource)
        {
            var shipping = mapper.Map<ShippingResource, Shipping>(shippingResource);

            context.Shippings.Add(shipping);
            await context.SaveChangesAsync();

            shipping = await context.Shippings.SingleOrDefaultAsync(s => s.Id == shipping.Id);

            var result = mapper.Map<Shipping, ShippingResource>(shipping);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShippings()
        {
            var shippings = await context.Shippings
                .Include(sh => sh.AppUser)
                .Include(sh => sh.ShoppingCart)
                .ThenInclude(sc => sc.ShoppingCartItems)
                .ThenInclude(sci => sci.Book)
                .ToListAsync();

            if (shippings == null)
                return NotFound("There are no any shippings.");

            var shippingsResource = mapper.Map<List<Shipping>, List<ShippingResource>>(shippings);

            return Ok(shippingsResource);

        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetShippingsByUser(string userId)
        {
            var shippings = await context.Shippings
                .Where(s => s.AppUserId == userId)
                .Include(sh => sh.AppUser)
                .Include(sh => sh.ShoppingCart)
                .ThenInclude(sc => sc.ShoppingCartItems)
                .ThenInclude(sci => sci.Book)
                .ToListAsync();

            if (shippings == null)
                return NotFound("There are no any shippings.");

            var shippingsResource = mapper.Map<List<Shipping>, List<ShippingResource>>(shippings);

            return Ok(shippingsResource);

        }

    }
}
