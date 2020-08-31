import { Component, Input } from '@angular/core';
import { Book } from '../models/Book';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Book;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Book) {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.cartService.create().subscribe(result => {
        localStorage.setItem('cartId', result.toString());

        // Add product to cart
      });
    } else {
      // Add product to cart
    }
  }

}

