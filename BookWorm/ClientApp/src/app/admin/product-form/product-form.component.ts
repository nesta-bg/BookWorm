import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Category {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: Category[] = [
    {value: 1, viewValue: 'One'},
    {value: 2, viewValue: 'Two'},
    {value: 3, viewValue: 'Three'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
