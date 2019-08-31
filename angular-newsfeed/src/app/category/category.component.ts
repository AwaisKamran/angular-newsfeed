import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public popularNews: any;
  public categories: any;
  public oldNews: any;
  public postImagesPath = this.constantsService.postImagesPath;

  constructor(
    public route: ActivatedRoute,
    public postService: PostService,
    public categoryService: CategoryService,
    public constantsService: ConstantsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getPosts();
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.getPostByCategory(category);
    });
  }

  getPosts() {
    this.postService.getAllPosts()
      .subscribe((res: any) => {
        this.popularNews = this.shuffle(res.data).slice(0, 4);
        this.oldNews = this.shuffle(res.data).slice(0, 3);
      }, (err: any) => {
      });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  navigateToNews(id, postHeading) {
    let slug = postHeading.replace(/[^\w\s]/gi, '').trim().toLowerCase().split(' ').splice(0, 4).join('-');
    this.router.navigate([`/news/${id}/${slug}`]);
  }

  getPostByCategory(category){
    this.categoryService.getPostByCategory(category)
      .subscribe((res: any) => {
        if(res.success){
          if(res.data.length > 0){
            this.categories = res.data;
          }
        }
        
      }, (err: any) => {
      });
  }
}
