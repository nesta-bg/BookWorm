import { AppUser } from './app-user';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    id: number;
    name: string;
    city: string;
    address1: string;
    appUser: AppUser;
    shoppingCart: ShoppingCart;
    shoppingCartItems: ShoppingCartItem[] = [];

    constructor(private orderDetails, private itemsMap: { [productId: number]: ShoppingCartItem }) {
        this.name = orderDetails.name;
        this.city = orderDetails.city;
        this.address1 = orderDetails.address1;

        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.shoppingCartItems.push(new ShoppingCartItem(item.book, item.quantity));
            this.id = item.shoppingCartId;
        }

        this.shoppingCart = new ShoppingCart(this.shoppingCartItems);
    }
}
