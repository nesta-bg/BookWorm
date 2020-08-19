import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Book, Category } from '../models/Book';
import { of, defer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Book[] = [];
  filteredProducts: Book[] = [];
  categories: Category[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) {

    // this.productService.getAll()
    //   .subscribe(
    //     (products: any) => {
    //       this.products = products;
    //       this.categoryService.getAll()
    //         .subscribe(categories => this.categories = categories);
    //       this.route.queryParamMap
    //         .subscribe(params => {
    //           this.category = params.get('category');

    //           if (this.category) {
    //             this.productService.getProductsByCategory(this.category)
    //               .subscribe(fProducts => this.filteredProducts = fProducts);
    //           } else {
    //             this.filteredProducts = this.products;
    //           }
    //         },
    //           err => {
    //             console.log(err);
    //           }
    //         );
    //     });



    // this.productService.getAll()
    //   .pipe(
    //     switchMap(products => {
    //       this.products = products;
    //       return this.categoryService.getAll()
    //         .pipe(
    //           map(categories => this.categories = categories)
    //         );
    //     }),
    //     switchMap(() => this.route.queryParamMap
    //       .pipe(
    //         switchMap(params => {
    //           this.category = params.get('category');
    //           return defer(() =>
    //             (Boolean(this.category) ?
    //               this.productService.getProductsByCategory(this.category) :
    //               of(this.products)
    //             )
    //           );
    //         })
    //       )
    //     )
    //   )
    //   .subscribe((filteredProducts) => {
    //     this.filteredProducts = filteredProducts;
    //   },
    //     err => {
    //       console.log(err);
    //     }
    //   );



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

    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);

  }

}
