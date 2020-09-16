namespace BookWorm.Controllers.Resources
{
    public class ShoppingCartItemResource
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public int BookId { get; set; }

        public BookResource Book { get; set; }

        public int ShoppingCartId { get; set; }
    }
}
