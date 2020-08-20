import { Component, Input } from '@angular/core';
import { Book } from '../models/Book';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Book;
  @Input('show-actions') showActions = true;

  constructor() { }

}
