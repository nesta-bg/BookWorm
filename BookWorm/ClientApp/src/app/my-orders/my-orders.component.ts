import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  user;
  orders: Order[] = [];
  title = 'My Orders';

  constructor(
    private userService: UserService,
    private orderService: OrderService) {

    this.user = this.userService.currentUser;
    this.orderService.getOrdersByUser(this.user.UserID)
      .subscribe(
        (res: any) => {
          this.orders = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
  }

}
