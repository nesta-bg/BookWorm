﻿namespace BookWorm.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public string ImageUrl { get; set; }
    }
}