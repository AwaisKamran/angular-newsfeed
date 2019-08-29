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
  private categories: any;
  private latestNews: any;
  private popularNews: any;
  private oldNews: any;
  private postImagesPath = this.constantsService.postImagesPath;
  
  constructor(
    private postService: PostService,
    private constantsService: ConstantsService,
    private router: Router
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
