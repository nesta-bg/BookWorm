using BookWorm.Core.Models;
using Microsoft.AspNetCore.Identity;
using System;

namespace BookWorm.Data
{
    public class BookWormSeeder
    {
        public static void SeedData(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        public static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Customer").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Customer";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;

                if (!roleResult.Succeeded)
                {
                    throw new InvalidOperationException("Failed to create Customer role");
                }
            }


            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Admin";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;

                if (!roleResult.Succeeded)
                {
                    throw new InvalidOperationException("Failed to create Admin role");
                }
            }
        }

        public static void SeedUsers(UserManager<AppUser> userManager)
        {
            if (userManager.FindByNameAsync("customer").Result == null)
            {
                AppUser user = new AppUser();
                user.FullName = "John Smith";
                user.Email = "customer@gmail.com";
                user.UserName = "customer";

                IdentityResult result = userManager.CreateAsync(user, "customer10").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Customer").Wait();
                }
            }


            if (userManager.FindByNameAsync("admin").Result == null)
            {
                AppUser user = new AppUser();
                user.FullName = "Nenad Stojkovic";
                user.Email = "admin@gmail.com";
                user.UserName = "admin";
                
                IdentityResult result = userManager.CreateAsync(user, "admin10").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }
    }
}
