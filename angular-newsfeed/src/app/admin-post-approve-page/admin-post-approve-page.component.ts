import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-post-approve-page',
  templateUrl: './admin-post-approve-page.component.html',
  styleUrls: ['./admin-post-approve-page.component.css']
})
export class AdminPostApprovePageComponent implements OnInit {
  public posts: any;
  public noDataAvailable: boolean = false;
  public showLoader: boolean = true;
  public postImagesPath = this.constantsService.postImagesPath; 
  public userImagesPath = this.constantsService.userImagesPath; 
  public error: boolean = false;
  public errorMessage: string = "Error! Please try again.";
  public success: boolean = false;
  public successMessage: string = "Success! Post Approved successfully!";

  constructor(
    public postService: PostService,
    public constantsService: ConstantsService,
    public router: Router
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

  navigateToEditPostPage(id){
    this.router.navigate([`/editPost/${id}`])
  }
}
