import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/Book';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Book[] = [];
  filteredProducts: Book[] = [];
  categories;
  category: string;

  constructor(
    private route: ActivatedRoute,
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

    // here we cannot use snapshot
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      if (this.category) {
        this.productService.getProductsByCategory(this.category).subscribe(products => this.filteredProducts = products);
      } else {
        this.filteredProducts = this.products;
      }
    });

  }

}
