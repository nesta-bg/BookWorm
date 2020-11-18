﻿using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class ShippingsController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;
        private readonly IShippingRepository repository;

        public ShippingsController(BookWormDbContext context, IMapper mapper, IShippingRepository repository)
        {
            this.context = context;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateShipping([FromBody] ShippingResource shippingResource)
        {
            var shipping = mapper.Map<ShippingResource, Shipping>(shippingResource);

            repository.AddShipping(shipping);
            await context.SaveChangesAsync();

            shipping = await repository.GetShippingById(shipping.Id);

            var result = mapper.Map<Shipping, ShippingResource>(shipping);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShippings()
        {
            var shippings = await repository.GetAllShippings();

            if (shippings == null)
                return NotFound("There are no any shippings.");

            var shippingsResource = mapper.Map<List<Shipping>, List<ShippingResource>>(shippings);

            return Ok(shippingsResource);

        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetShippingsByUser(string userId)
        {
            var shippings = await repository.GetShippingsByUser(userId);

            if (shippings == null)
                return NotFound("There are no any shippings.");

            var shippingsResource = mapper.Map<List<Shipping>, List<ShippingResource>>(shippings);

            return Ok(shippingsResource);

        }

        [HttpGet("shipping/{shippingId}")]
        public async Task<IActionResult> GetShippingById(int shippingId)
        {
            var shipping = await repository.GetShippingByIdWithCartAndProducts(shippingId);

            if (shipping == null)
                return NotFound("There are no any shippings.");

            var shippingsResource = mapper.Map<Shipping, ShippingResource>(shipping);

            return Ok(shippingsResource);

        }

    }
}
