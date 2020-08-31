import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = 'https://localhost:44390/api/shoppingcarts';

  constructor(private http: HttpClient) { }

  create() {
    return this.http.post(this.url, {});
  }
}

