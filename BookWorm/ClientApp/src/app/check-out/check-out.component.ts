import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {

    (await this.shoppingCartService.getShoppingCart())
      .subscribe(cart => this.cart = cart);
    this.shoppingCartService.reloadCart.next(true);

    this.shoppingCartService.reloadCart
      .pipe(delay(1),
        switchMap(async status => {
          if (status)
            return (await this.shoppingCartService.getShoppingCart()).toPromise();
        })
      ).subscribe(cart => this.cart = cart);
  }

}
