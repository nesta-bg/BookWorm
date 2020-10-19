import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}

