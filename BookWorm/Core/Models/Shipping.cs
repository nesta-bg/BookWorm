﻿namespace BookWorm.Core.Models
{
    public class Shipping
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public int ShoppingCartId { get; set; }

        public ShoppingCart ShoppingCart { get; set; }

        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

    }
}
