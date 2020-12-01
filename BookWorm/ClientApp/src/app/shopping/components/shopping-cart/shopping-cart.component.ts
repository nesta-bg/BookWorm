import { Component, OnInit, SecurityContext } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: Observable<ShoppingCart>;
  displayedColumns: string[] = ['image', 'product', 'unitPrice', 'quantity', 'totalPrice'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.cart = await this.shoppingCartService.getShoppingCart();
    this.shoppingCartService.reloadCart.next(true);

    this.shoppingCartService.reloadCart
      .pipe(delay(100))
      .subscribe
        (async status => {
          if (status) {
            this.cart = await this.shoppingCartService.getShoppingCart();
          }
        },
        err => {
          throw err;
        }
      );

  }

  clearCart() {
    this.shoppingCartService.clearShoppingCartItems()
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

  getBackground(imageUrl: string) {
    let image = imageUrl.replace(/\\/g, '/');
    return this.sanitizer.sanitize(SecurityContext.STYLE, 'url(' + window.location.origin + image + ')');
  }

}
