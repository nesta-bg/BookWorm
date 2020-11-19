using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace BookWorm.Core.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }

        public Shipping Shipping { get; set; }

        public ICollection<ShoppingCartItem> ShoppingCartItems { get; set; }

        public ShoppingCart()
        {
            ShoppingCartItems = new Collection<ShoppingCartItem>();
        }
    }
}
