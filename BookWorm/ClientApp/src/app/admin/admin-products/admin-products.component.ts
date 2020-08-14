import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'action'];
  products;

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(products => this.products = new MatTableDataSource(products));
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

}
