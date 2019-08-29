import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-admin-post-approve-page',
  templateUrl: './admin-post-approve-page.component.html',
  styleUrls: ['./admin-post-approve-page.component.css']
})
export class AdminPostApprovePageComponent implements OnInit {
  private posts: any;
  private noDataAvailable: boolean = false;
  private showLoader: boolean = true;
  private postImagesPath = this.constantsService.postImagesPath; 
  private userImagesPath = this.constantsService.userImagesPath; 
  private error: boolean = false;
  private errorMessage: string = "Error! Please try again.";
  private success: boolean = false;
  private successMessage: string = "Success! Post Approved successfully!";

  constructor(
    private postService: PostService,
    private constantsService: ConstantsService
  ) { }

  ngOnInit() {
    this.getUnApprovedPosts();
  }

  getUnApprovedPosts(){
    this.postService.getUnApprovedPosts()
    .subscribe((res: any) => {
      if(res.data.length > 0){
        this.posts = res.data;
        this.noDataAvailable = false;
      }
      else{
        this.noDataAvailable = true;
      }
      this.showLoader = false;
      this.success = false;
      this.error = false;
    }, (err: any) => {
    });
  }

  approvePost(id){
    this.showLoader = true;
    this.postService.approvePost(id)
    .subscribe((res: any) => {
      this.getUnApprovedPosts();
      this.success = true;
      this.error = false;
    }, (err: any) => {
      this.success = false;
      this.error = true;
    });
  }
}
