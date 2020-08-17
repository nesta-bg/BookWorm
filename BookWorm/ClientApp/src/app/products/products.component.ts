import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products;
  categories;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService) {
    this.productService.getAll()
      .subscribe(
        (products: any) => {
          this.products = products;
        },
        err => {
          console.log(err);
        }
      );

    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }

}
