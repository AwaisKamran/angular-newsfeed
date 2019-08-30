import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public postId: any;
  public error: boolean = false;
  public errorMessage: string = "Error! Internal server error.";
  public success: boolean = false;
  public successMessage: string = "Congratulations! your post is updated.";
  public data: any = {
    MetaTitle: undefined,
    MetaDescription: undefined,
    MetaKeywords: undefined,
    ModifiedBy: localStorage.getItem("userId"),
    postSource: undefined,
    OwnerOfSource: undefined
  };

  constructor(
    public route: ActivatedRoute,
    public postService: PostService
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  clearDataFields(){
    this.data.MetaTitle = undefined;
    this.data.MetaDescription = undefined;
    this.data.MetaKeywords = undefined;
    this.data.ModifiedBy = localStorage.getItem("userId");
    this.data.postSource = undefined;
    this.data.OwnerOfSource = undefined;
  }

  editPost(){
   this.postService.editPost(this.postId, this.data) 
    .subscribe((res: any) => {
      this.success = true;
      this.error = false;
      this.clearDataFields();
    }, (err: any) => {
      this.success = false;
      this.error = true;
    });
  }
}
