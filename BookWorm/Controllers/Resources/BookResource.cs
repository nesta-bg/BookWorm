﻿namespace BookWorm.Controllers.Resources
{
    public class BookResource
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        public string ImageUrl { get; set; }
    }
}
