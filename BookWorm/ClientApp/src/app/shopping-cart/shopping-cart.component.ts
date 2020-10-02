import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart;
  displayedColumns: string[] = ['title', 'unitPrice', 'quantity', 'totalPrice'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService) { }

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
