import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild([
        { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]}
    ])
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersComponent,
    OrderDetailsComponent,
    SummaryPipe,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
})
export class SharedModule { }
