import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
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

    this.shoppingCartService.reloadCart.subscribe(async status => {
      if (status) {
        this.cart = await this.shoppingCartService.getShoppingCart();
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/']);
  }

}
