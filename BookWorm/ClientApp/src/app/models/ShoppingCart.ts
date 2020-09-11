import { ShoppingCartItem } from './Product';

export class ShoppingCart {
    id: number;
    dateCreated: string;

    constructor(public shoppingCartItems: ShoppingCartItem[]) {}

    get totalItemsCount() {
        let count = 0;
        for (let id in this.shoppingCartItems)
          count += this.shoppingCartItems[id].quantity;
        return count;
    }
}
