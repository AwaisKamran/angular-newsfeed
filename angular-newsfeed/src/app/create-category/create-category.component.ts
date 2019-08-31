import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  public error: boolean = false;
  public categoryName: any;
  public errorMessage: string = "Error! Internal Server error.";
  public success: boolean = false;
  public successMessage: string = "Congratulations! your category is created.";

  constructor(
    public categoryService: CategoryService
  ) { }

  postCategory() {
    let data = {
      "categoryName": this.categoryName
    };

    this.categoryService.createCategory(data)
    .subscribe((res: any) => {
        this.success = true;
        this.error = false;
        this.categoryName = undefined;
      }, (err: any) => {
        this.error = true;
        this.success = false;
        this.errorMessage = "Error! Internal server error";
      });
  }
}
