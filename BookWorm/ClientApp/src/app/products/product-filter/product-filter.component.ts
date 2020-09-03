import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories: Category[] = [];
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }


}
