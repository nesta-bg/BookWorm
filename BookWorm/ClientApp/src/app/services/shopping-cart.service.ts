import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = 'https://localhost:44390/api/shoppingcarts';

  constructor(private http: HttpClient) { }

  private create() {
    return this.http.post(this.url, {});
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create().toPromise();
    localStorage.setItem('cartId', result.toString());
    return result.toString();
  }

  async addToCart(product: Book) {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);
  }
}

