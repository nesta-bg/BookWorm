import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/Product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  shoppingCartItemCount: number;
  cart: ShoppingCart;

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private router: Router) {
    this.user = this.userService.currentUser;
  }

  async ngOnInit() {
    this.userService.isLoggedInSubject.subscribe(status => {
      if (status) {
        this.user = this.userService.currentUser;
      }
    });

    this.shoppingCartService.getShoppingCart()
      .subscribe(cart => {
        this.cart = cart;
        this.getShoppingCartItemCount(this.cart);
      });

    this.shoppingCartService.reloadCart
      .pipe(
        switchMap(status => {
          if (status)
            return this.shoppingCartService.getShoppingCart();
        })
      ).subscribe(cart => {
        this.cart = cart;
        this.getShoppingCartItemCount(this.cart);
      });
}

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/']);
  }

  private getShoppingCartItemCount(shoppingCart: ShoppingCart) {
    this.shoppingCartItemCount = 0;
    for (let id in shoppingCart.shoppingCartItems)
      this.shoppingCartItemCount += shoppingCart.shoppingCartItems[id].quantity;
  }

}
