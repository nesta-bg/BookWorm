import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/Book';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'action'];
  products: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(
        (res: any) => {
          this.products = new MatTableDataSource(res);
          this.products.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

}
