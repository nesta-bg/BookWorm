import { ShoppingCartItem } from './ShoppingCartItem';


export class ShoppingCart {
  id: number;
  dateCreated: string;
  shoppingCartItems: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: number]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.shoppingCartItems.push(new ShoppingCartItem(item.book, item.quantity));
    }

  }

  get totalItemsCount() {
    let count = 0;
    for (let id in this.shoppingCartItems)
      count += this.shoppingCartItems[id].quantity;
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let id in this.shoppingCartItems)
      sum += this.shoppingCartItems[id].totalPrice;
    return sum;
  }
}
