import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'shared/models/product';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'action'];
  products: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getAll()
      .subscribe(
        (res: any) => {
          this.products = new MatTableDataSource(res);
          this.products.paginator = this.paginator;
          this.products.sort = this.sort;
        },
        err => {
          throw err;
        }
      );
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

}
