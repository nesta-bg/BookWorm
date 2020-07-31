using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    public class AppUsersController : Controller
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public AppUsersController(
            UserManager<AppUser> userManager,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<Object> Register([FromBody]AppUserResource model)
        {
            var appUser = this.mapper.Map<AppUserResource, AppUser>(model);

            try
            {
                var result = await this.userManager.CreateAsync(appUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
