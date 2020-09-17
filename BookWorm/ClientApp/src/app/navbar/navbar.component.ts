import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  shoppingCartItemCount: number;
  cart: Observable<ShoppingCart>;

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

    this.cart = this.shoppingCartService.getShoppingCart();

    this.shoppingCartService.reloadCart.subscribe(status => {
      if (status) {
        this.cart = this.shoppingCartService.getShoppingCart();
      }
    });

  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/']);
  }

}
