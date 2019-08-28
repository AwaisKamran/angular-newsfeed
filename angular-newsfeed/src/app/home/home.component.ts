import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private categories: any;
  private latestNews: any;
  private postImagesPath = 'http://localhost:56003/Images/Post/'
  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategoryPosts();
  }

  getCategoryPosts(){
    this.postService.getCategoryPosts()
      .subscribe((res: any) => {
        this.categories = res.data;
        this.latestNews = this.categories[0].Posts.slice(0,6);
      }, (err: any) => {
      });
  }

  navigateToNews(id){
    this.router.navigate([`/news/${id}`]);
  }
}
