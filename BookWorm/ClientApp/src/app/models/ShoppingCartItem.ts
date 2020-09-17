import { Product } from './Product';

export class ShoppingCartItem {
    id: number;
    bookId: number;
    shoppingCartId: number;

    constructor(public book: Product, public quantity: number) { }

    get totalPrice() {
        return this.book.price * this.quantity;
    }
}


