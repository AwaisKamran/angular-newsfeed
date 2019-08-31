import { Component, ViewChild, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  public posts: any;
  public postImagesPath = this.constantsService.postImagesPath;
  public userImagesPath = this.constantsService.userImagesPath;
  public noDataAvailable = false;

  constructor(
    public postService: PostService,
    public constantsService: ConstantsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getTimeLinePosts(localStorage.getItem("userId"));
  }

  getTimeLinePosts(id) {
    this.postService.getTimelinePosts(id)
      .subscribe((res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.noDataAvailable = false;
            this.posts = res.data;
          }
          else {
            this.noDataAvailable = true;
          }
        }
      }, (err: any) => {
      });
  }

  navigateToNews(id, postHeading) {
    let slug = postHeading.replace(/[^\w\s]/gi, '').trim().toLowerCase().split(' ').splice(0, 4).join('-');
    this.router.navigate([`/news/${id}/${slug}`]);
  }
}
