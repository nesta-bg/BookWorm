﻿using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;
        private readonly AuthSettings authSettings;

        public AppUsersController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            IOptions<AuthSettings> authSettings)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.authSettings = authSettings.Value;
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

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginResource model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user != null && await this.userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim("UserName", user.UserName)
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.authSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
    }
}
