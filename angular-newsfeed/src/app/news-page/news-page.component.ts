import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  private post: any = undefined;
  private postImagesPath = this.constantsService.postImagesPath; 
  private userImagesPath = this.constantsService.userImagesPath; 
  private popularNews: any;
  private oldNews: any;
  contentNotReceived = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private constantsService: ConstantsService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getPostById(id);
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

}
