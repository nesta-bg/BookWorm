import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoAccessComponent } from './components/no-access/no-access.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    NoAccessComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule.forChild([
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
