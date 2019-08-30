import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categories: any;
  public latestNews: any;
  public popularNews: any;
  public oldNews: any;
  public postImagesPath = this.constantsService.postImagesPath;
  
  constructor(
    public postService: PostService,
    public constantsService: ConstantsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getCategoryPosts();
    this.getPosts();
  }

  getCategoryPosts(){
    this.postService.getCategoryPosts()
      .subscribe((res: any) => {
        this.categories = res.data;
        this.latestNews = this.categories[0].Posts.slice(0,6);
      }, (err: any) => {
      });
  }

  getPosts(){
    this.postService.getAllPosts()
      .subscribe((res: any) => {
        this.popularNews = this.shuffle(res.data).slice(0,4);
        this.oldNews = this.shuffle(res.data).slice(0,3);
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

  navigateToNews(id){
    this.router.navigate([`/news/${id}`]);
  }
}
