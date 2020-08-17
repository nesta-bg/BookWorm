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
  MatTableModule,
  MatPaginatorModule} from '@angular/material';

const MaterialComponents = [
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
