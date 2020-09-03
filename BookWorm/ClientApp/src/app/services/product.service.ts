import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://localhost:44390/api/books';

  constructor(private http: HttpClient) { }

  create(book) {
    return this.http.post(this.url, book);
  }

  getAll() {
    return this.http.get<Product[]>(this.url);
  }

  get(productId) {
    return this.http.get<Product>(this.url + '/' + productId);
  }

  getProductsByCategory(category) {
    return this.http.get<Product[]>(this.url + '/category/' + category);
  }

  update(productId, product) {
    return this.http.put(this.url + '/' + productId, product);
  }

  delete(productId) {
    return this.http.delete(this.url + '/' + productId);
  }
}
