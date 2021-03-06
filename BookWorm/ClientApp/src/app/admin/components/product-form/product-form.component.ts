import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceValidators } from 'app/admin/validators/price.validators';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories;
  id;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {

    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, PriceValidators.shouldBePositive]],
      categoryId: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);

    // if (this.id) this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p);
    if (this.id)
      this.productService.get(this.id)
        .subscribe(
          p => this.editProduct(p)
          , err => {
            throw err;
          }
        );
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

  editProduct(product: Product) {
    this.productForm.patchValue({
      title: product.title,
      price: product.price,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl
    });
  }

  save() {
    if (this.id) {
      this.productService.update(this.id, this.productForm.value).subscribe(
        (res: any) => {
          this.productForm.markAsPristine();
          this.toastr.success('New product updated!', 'Product successfully updated.');
          this.router.navigate(['/admin/products']);
        },
        err => {
          this.toastr.error('Error', 'Updating failed.');
          console.log(err);
        }
      );
    } else {
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

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id).subscribe(
      (res: any) => {
        this.toastr.success('Product deleted!', 'Successful product deletion.');
        this.router.navigate(['/admin/products']);
      },
      err => {
        this.toastr.error('Error', 'Product creation failed.');
        console.log(err);
      }
    );
  }

}
