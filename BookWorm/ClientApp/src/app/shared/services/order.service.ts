import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'https://localhost:44390/api/shippings';

  constructor(
    private http: HttpClient) { }

  placeOrder(shipping) {
    return this.http.post(this.url, shipping);
  }

  getOrders() {
    return this.http.get(this.url);
  }

  getOrdersByUser(userId) {
    return this.http.get(this.url + '/' + userId);
  }

  getOrderById(orderId) {
    return this.http.get<Order>(this.url + '/shipping/' + orderId)
      .pipe(map(x => new Order(x, x.shoppingCart.shoppingCartItems)
      ));
  }

}
