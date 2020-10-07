import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { of, defer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  isExpanded = true;
  media$: Observable<MediaChange[]>;
  cart: ShoppingCart;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private media: MediaObserver,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.media$ = this.media.asObservable();
    this.populateProducts();
    this.getShoppingCart();

    this.shoppingCartService.reloadCart
      .pipe(
        switchMap(async status => {
          if (status)
            return (await this.shoppingCartService.getShoppingCart()).toPromise();
        })
      ).subscribe(cart => this.cart = cart);
  }

  private populateProducts() {
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

  private async getShoppingCart() {
    (await this.shoppingCartService.getShoppingCart())
    .subscribe(cart => {
      this.cart = cart;
      this.shoppingCartService.reloadCart.next(true);
    });
  }

  ngAfterViewInit() {
    this.media$.subscribe(mq => {
      mq.forEach(element => {
        if (element.mqAlias === 'lt-lg')
          this.isExpanded = false;

        else if (element.mqAlias === 'gt-md')
          this.isExpanded = true;
      });
    });
  }

}
