import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private url = 'https://localhost:44390/api/categories';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>(this.url);
  }
}
