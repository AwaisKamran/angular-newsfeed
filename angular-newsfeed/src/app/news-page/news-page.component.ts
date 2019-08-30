import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  public post: any = undefined;
  public postImagesPath = this.constantsService.postImagesPath; 
  public userImagesPath = this.constantsService.userImagesPath; 
  public popularNews: any;
  public oldNews: any;
  contentNotReceived = true;

  constructor(
    public route: ActivatedRoute,
    public postService: PostService,
    public constantsService: ConstantsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getPostById(id);
    });
    this.getPosts();
  }

  getPostById(id){
    this.postService.getPostById(id)
      .subscribe((res: any) => {
        this.post = res.data;
        this.contentNotReceived = false;
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

  navigateToNews(id, postHeading){
    let slug = postHeading.replace(/[^\w\s]/gi, '').trim().toLowerCase().split(' ').splice(0,4).join('-');;
    this.router.navigate([`/news/${id}/${slug}`]);
  }

}
