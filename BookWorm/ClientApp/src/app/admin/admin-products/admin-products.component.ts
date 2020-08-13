import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'action'];
  products;

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(products => this.products = products);
  }

  ngOnInit() {
  }

}
