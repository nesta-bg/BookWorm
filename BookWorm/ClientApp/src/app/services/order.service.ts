import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'https://localhost:44390/api/shippings';

  constructor(
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(shipping) {
    let result = await this.http.post(this.url, shipping);
    await this.shoppingCartService.clearShoppingCart().toPromise();
    return result;
  }
}

