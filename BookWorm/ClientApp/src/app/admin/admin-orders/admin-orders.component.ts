import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders;
  displayedColumns: string[] = ['name', 'date', 'id'];

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
