import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  id: number;
  dateCreated: string;
  shoppingCartItems: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: number]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.shoppingCartItems.push(new ShoppingCartItem(item.book, item.quantity));
      this.id = item.shoppingCartId;
    }

  }

  getQuantity(product: Product) {
    let item;

    for (let productId in this.itemsMap) {
      if (this.itemsMap[productId].book.id === product.id)
        item = this.itemsMap[productId];
    }
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let id in this.shoppingCartItems)
      sum += this.shoppingCartItems[id].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let id in this.shoppingCartItems)
      count += this.shoppingCartItems[id].quantity;
    return count;
  }
}
