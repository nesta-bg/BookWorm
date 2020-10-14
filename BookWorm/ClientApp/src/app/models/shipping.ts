import { FormGroup } from '@angular/forms';
import { ShoppingCart } from './shopping-cart';

export class Shipping {
    id: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    shoppingCartId: number;
    appUserId: string;

    constructor(form: FormGroup, cart: ShoppingCart, user) {
        this.name = form.get('name').value;
        this.address1 = form.get('address1').value;
        this.address2 = form.get('address2').value;
        this.city = form.get('city').value;
        this.shoppingCartId = cart.id;
        this.appUserId = user.UserID;
    }
}

