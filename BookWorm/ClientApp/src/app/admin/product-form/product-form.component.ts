import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService) {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: [''],
      price: [''],
      categoryId: [''],
      imageUrl: ['']
    });
  }

  save() {
    this.productService.create(this.productForm.value).subscribe(
      (res: any) => {
        this.productForm.markAsPristine();
        this.toastr.success('New product created!', 'Successful product creation.');
      },
      err => {
        this.toastr.error('Error', 'Product creation failed.');
        console.log(err);
      }
    );
  }
}
