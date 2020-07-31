using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BookWorm.Models
{
    public class AppUser : IdentityUser
    {
        [StringLength(150)]
        public string FullName { get; set; }
    }
}
