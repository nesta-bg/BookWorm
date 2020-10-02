import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: Observable<ShoppingCart>;
  displayedColumns: string[] = ['title', 'unitPrice', 'quantity', 'totalPrice'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService) { }

  async ngOnInit() {
    this.cart = await this.shoppingCartService.getShoppingCart();

    this.shoppingCartService.reloadCart.subscribe(async status => {
      if (status) {
        this.cart = await this.shoppingCartService.getShoppingCart();
      }
    });

  }

  clearCart() {
    this.shoppingCartService.clearShoppingCart()
      .subscribe(
        (res: any) => {
          this.toastr.success('Cart cleared!', 'Successful cart clearing.');
          this.shoppingCartService.reloadCart.next(true);
        },
        err => {
          this.toastr.error('Error', 'Cart clearing failed.');
          console.log(err);
        }
      );
  }

}
