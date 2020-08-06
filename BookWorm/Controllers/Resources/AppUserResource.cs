using System.ComponentModel.DataAnnotations;

namespace BookWorm.Controllers.Resources
{
    public class AppUserResource
    {
        [StringLength(35)]
        public string FullName { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}
