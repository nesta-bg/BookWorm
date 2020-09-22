import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart;
  displayedColumns: string[] = ['title', 'unitPrice', 'quantity', 'totalPrice'];

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart = this.shoppingCartService.getShoppingCart();

    this.shoppingCartService.reloadCart
      .subscribe(
        status => {
          if (status) {
            this.cart = this.shoppingCartService.getShoppingCart();
          }
        }
      );

  }

}
