import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/Book';
import { of, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Book[] = [];
  filteredProducts: Book[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {

    this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap
            .pipe(
              switchMap(params => {
                this.category = params.get('category');
                return defer(() =>
                (Boolean(this.category) ?
                  this.productService.getProductsByCategory(this.category) :
                  of(this.products)
                ));
              })
            );
        })
      )
      .subscribe((filteredProducts) => {
        this.filteredProducts = filteredProducts;
      },
        err => {
          console.log(err);
        }
      );
  }

}
