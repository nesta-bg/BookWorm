import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Shipping } from '../models/shipping';
import { OrderService } from '../services/order.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  shippingForm: FormGroup;
  user;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required]
    });

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
    console.log(this.shippingForm.value);
    let shipping = new Shipping(this.shippingForm, this.cart, this.user);

    this.orderService.placeOrder(shipping)
      .subscribe(
        (res: any) => {
          this.toastr.success('Success!', 'Successfully Created Order.');
          this.shoppingCartService.removeShoppingCart();
          this.router.navigate(['/order-success', res.id]);
          this.shoppingCartService.reloadCart.next(true);
        },
        err => {
          this.toastr.error('Error', 'Order Creating failed.');
          console.log(err);
        }
    );
  }

}
