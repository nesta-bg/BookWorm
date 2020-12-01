import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  id;
  displayedColumns: string[] = ['image', 'productTitle', 'unitPrice', 'quantity', 'totalPrice'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private sanitizer: DomSanitizer) {

    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.id) {
      this.orderService.getOrderById(this.id)
        .subscribe(
          (res: any) => {
            this.order = res;
          },
          err => {
            throw err;
          });
    }
  }

  getBackground(imageUrl: string) {
    let image = imageUrl.replace(/\\/g, '/');
    return this.sanitizer.sanitize(SecurityContext.STYLE, 'url(' + window.location.origin + image + ')');
  }

}
