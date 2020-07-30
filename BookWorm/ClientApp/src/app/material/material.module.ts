import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule } from '@angular/material';

const MaterialComponents = [
  MatToolbarModule,
  MatSidenavModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
