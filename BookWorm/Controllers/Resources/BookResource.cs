using System.ComponentModel.DataAnnotations;

namespace BookWorm.Controllers.Resources
{
    public class BookResource
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        public string ImageUrl { get; set; }
    }
}
