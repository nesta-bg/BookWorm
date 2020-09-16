import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart;
  displayedColumns: string[] = ['id', 'title', 'quantity', 'price'];

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart = this.shoppingCartService.getShoppingCart();
  }

}
