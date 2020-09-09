import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ShoppingCartItem } from '../models/Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private urlCarts = 'https://localhost:44390/api/shoppingcarts';
  private urlCartItems = 'https://localhost:44390/api/shoppingcartitems';

  reloadCart: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  private create() {
    return this.http.post(this.urlCarts, {});
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create().toPromise();
    localStorage.setItem('cartId', result.toString());
    return result.toString();
  }

  private isThereShoppingCartItem(bookId: number, shoppingCartId: number) {
    return this.http.get(this.urlCartItems + '/item/' + bookId + '/' + shoppingCartId);
  }

  private getShoppingCartItem(bookId: number, shoppingCartId: number) {
    return this.http.get<ShoppingCartItem>(this.urlCartItems + '/' + bookId + '/' + shoppingCartId);
  }

  private updateShoppingCartItem(bookId: number, shoppingCartId: number, item: ShoppingCartItem) {
    return this.http.put(this.urlCartItems + '/' + bookId + '/' + shoppingCartId, item);
  }

  private createShoppingCartItem(item: ShoppingCartItem) {
    return this.http.post(this.urlCartItems, item);
  }

  async addToCart(product: Product) {
    let cartId = Number(await this.getOrCreateCartId());
    let isThereItem = await this.isThereShoppingCartItem(product.id, cartId).toPromise();

    if (isThereItem) {
      let item = await this.getShoppingCartItem(product.id, cartId).toPromise();
      item.quantity += 1;
      await this.updateShoppingCartItem(product.id, cartId, item).toPromise();
    } else {
      let newItem = { id: 0, quantity: 1, bookId: product.id, shoppingCartId: cartId };
      await this.createShoppingCartItem(newItem).toPromise();
    }

    this.reloadCart.next(true);
  }

  getShoppingCart() {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) return null;

    return this.http.get(this.urlCarts + '/' + cartId);
  }

}
