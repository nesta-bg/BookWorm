import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private urlCarts = 'https://localhost:44390/api/shoppingcarts';
  private urlCartItems = 'https://localhost:44390/api/shoppingcartitems';

  reloadCart: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  getShoppingCart(): Observable<ShoppingCart> {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) return null;

    return this.http.get<ShoppingCart>(this.urlCarts + '/' + cartId)
      .pipe(map(x => new ShoppingCart(x.shoppingCartItems)));
  }

  clearShoppingCart() {
    let cartId = localStorage.getItem('cartId');

    if (cartId)
      return this.http.delete(this.urlCartItems + '/' + cartId);
  }

  async addToCart(product: Product) {
    let cartId = Number(await this.getOrCreateCartId());
    let isThereItem = await this.isThereShoppingCartItem(product.id, cartId).toPromise();

    if (isThereItem) {
      this.updateItemQuantity(product, 1);
    } else {
      let newItem = { id: 0, quantity: 1, bookId: product.id, shoppingCartId: cartId };
      await this.createShoppingCartItem(newItem).toPromise();
      this.reloadCart.next(true);
    }
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

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

  private createShoppingCartItem(item) {
    return this.http.post(this.urlCartItems, item);
  }

  private deleteShoppingCartItem(bookId: number, shoppingCartId: number) {
    return this.http.delete(this.urlCartItems + '/' + bookId + '/' + shoppingCartId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = Number(localStorage.getItem('cartId'));

    let item = await this.getShoppingCartItem(product.id, cartId).toPromise();
    item.quantity += change;

    if (item.quantity === 0)
      await this.deleteShoppingCartItem(product.id, cartId).toPromise();

    else
      await this.updateShoppingCartItem(product.id, cartId, item).toPromise();

    this.reloadCart.next(true);
  }
}
