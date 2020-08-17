import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products;

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(
        (products: any) => {
          this.products = products;
        },
        err => {
          console.log(err);
        }
      );
  }

}
