import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Input('orders') orders;
  @Input('title') title;
  displayedColumns: string[] = ['name', 'date', 'id'];

  constructor() { }

  ngOnInit() {
  }

}
