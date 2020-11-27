import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    NoAccessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
