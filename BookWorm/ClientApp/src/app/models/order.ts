import { ShoppingCart } from './shopping-cart';

export interface Order {
    id: number;
    name: string;
    shoppingCart: ShoppingCart;
}
