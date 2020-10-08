import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shippingForm: FormGroup;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required]
    });
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
  }

}
