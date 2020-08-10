import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://localhost:44390/api/books';

  constructor(private http: HttpClient) { }

  create(book) {
    return this.http.post(this.url, book);
  }
}
