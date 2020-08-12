import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { PriceValidators } from 'src/app/shared/price.validators';
import { Router } from '@angular/router';

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
    private toastr: ToastrService,
    private router: Router) {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, PriceValidators.shouldBePositive]],
      categoryId: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get categoryId() {
    return this.productForm.get('categoryId');
  }
  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  save() {
    this.productService.create(this.productForm.value).subscribe(
      (res: any) => {
        this.productForm.markAsPristine();
        this.toastr.success('New product created!', 'Successful product creation.');
        this.router.navigate(['/admin/products']);
      },
      err => {
        this.toastr.error('Error', 'Product creation failed.');
        console.log(err);
      }
    );
  }
}
