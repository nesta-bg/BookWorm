import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  title = 'All Orders';
  constructor(private orderService: OrderService) {
    this.orderService.getOrders()
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
