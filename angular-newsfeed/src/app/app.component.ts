import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-newsfeed';
  animal: string;
  name: string;
  categories: any
  currentTime = new Date().toUTCString();

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public categoryService: CategoryService,
    public router: Router
  ) { }

  getCategories() {
    this.categoryService.getCategory()
      .subscribe((res: any) => {
        if (res.success) {
          this.categories = res.data;
        }
      }, (err: any) => {
      });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  logout(){
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    this.router.navigate(['/register'])
      .then(() => {
        window.location.reload();
      });
  }

  fetchCategories(categoryName){
    this.router.navigate([`/category/${categoryName}`]);
  }
}