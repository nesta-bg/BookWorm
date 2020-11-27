import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { SummaryPipe } from './pipes/summary.pipe';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersComponent,
    OrderDetailsComponent,
    SummaryPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    RouterModule.forChild([
        { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]}
    ])
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersComponent,
    OrderDetailsComponent,
    SummaryPipe
  ],
  providers: [],
})
export class SharedModule { }
