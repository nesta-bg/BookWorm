using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace BookWorm.Controllers.Resources
{
    public class ShoppingCartResource
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<ShoppingCartItemResource> ShoppingCartItems { get; set; }

        public ShoppingCartResource()
        {
            ShoppingCartItems = new Collection<ShoppingCartItemResource>();
        }
    }
}
