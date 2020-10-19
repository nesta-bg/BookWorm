import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Shipping } from '../models/shipping';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shippingForm: FormGroup;
  cart: ShoppingCart;
  user;

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) { }

  async ngOnInit() {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required]
    });

    (await this.shoppingCartService.getShoppingCart())
      .subscribe(cart => this.cart = cart);

    this.user = this.userService.currentUser;
  }

  get name() {
    return this.shippingForm.get('name');
  }
  get address1() {
    return this.shippingForm.get('address1');
  }
  get address2() {
    return this.shippingForm.get('address2');
  }
  get city() {
    return this.shippingForm.get('city');
  }

  placeOrder() {
    let shipping = new Shipping(this.shippingForm, this.cart, this.user);

    this.orderService.placeOrder(shipping)
      .pipe(
        switchMap(async (res: any) => {
          this.toastr.success('Success!', 'Successfully Created Order.');
          this.shoppingCartService.reloadCart.next(true);
          this.router.navigate(['/order-success', res.id]);
          return (await this.shoppingCartService.clearShoppingCart()).toPromise();
        })
      ).subscribe();
  }

}
