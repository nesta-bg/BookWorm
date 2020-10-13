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
    }
}
