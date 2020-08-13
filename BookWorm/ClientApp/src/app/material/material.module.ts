import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule} from '@angular/material';

const MaterialComponents = [
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
