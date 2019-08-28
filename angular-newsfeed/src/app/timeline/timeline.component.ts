import { Component, ViewChild, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{
  private data = {
    heading: undefined,
    source: undefined,
    owner: undefined,
    news: undefined,
    tag: undefined,
    category: undefined
  };
  private selectedFile: File = null;
  private isDisabled = false;
  private imageUrl: any = "../../assets/placeholder-post.png";
  private categories: any;
  private posts: any;
  private tags: string[] = [];
  private currentTime = new Date().toUTCString();
  private error: boolean = false;
  private errorMessage: string = "Error! Please fill in all the fields.";
  private success: boolean = false;
  private successMessage: string = "Congratulations! your news is posted successfully.";
  private postImagesPath = 'http://localhost:56003/Images/Post/'
  private userImagePath = 'http://localhost:56003/Images/User/'
  @ViewChild('uploader', { static: false }) fileUploader;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTimeLinePosts(localStorage.getItem("userId"));
  }

  addTags() {
    if (this.data.tag) {
      this.tags.push(`#${this.data.tag.trim().toLowerCase()}`);
      this.data.tag = undefined;
    }
  }

  createPost(){
    if(
      this.data &&
      this.data.heading && 
      this.data.source && 
      this.data.owner && 
      this.data.news && 
      this.tags && this.tags.length > 0 &&
      this.data.category
    ){
      this.isDisabled = false;
      this.error = false;

      const fd = new FormData();
      fd.append('image', this.selectedFile);
      fd.append("postTitle", this.data.heading);
      fd.append("postContent", this.data.news);
      fd.append("postCategory", this.data.category);
      fd.append("postedBy", localStorage.getItem("userId"));
      fd.append("Tags", this.tags.join(','));
      fd.append("postSource", this.data.source);
      fd.append("OwnerOfSource", this.data.owner);

      this.postService.createPost(fd)
        .subscribe((res: any) => {
          this.success = true;
          this.error = false;
          this.clearDataFields();
          this.isDisabled = false;
          this.getTimeLinePosts(localStorage.getItem("userId"));
        }, (err: any) => {
          this.error = true;
          this.errorMessage = "Error! Internal server error";
        });
    }
    else{
      this.success = false;
      this.error = true;
      this.errorMessage = "Error! Please fill in all the fields.";
    }
  }

  clearDataFields(){
    this.data.heading = undefined; 
    this.data.source = undefined; 
    this.data.owner = undefined; 
    this.data.news = undefined; 
    this.data.tag = undefined;
    this.data.category = undefined;
    this.tags = [];
    this.imageUrl = "../../assets/placeholder-post.png";
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    var container = this;
    var reader = new FileReader();
    reader.onload = function(){
      container.imageUrl = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getCategories(){
    this.postService.getCategories()
    .subscribe((res: any) => {
      this.categories = res.data;
    }, (err: any) => {
      this.error = true;
      this.errorMessage = "Error! Unable to fetch categories.";
    });
  }

  getTimeLinePosts(id){
    this.postService.getTimelinePosts(id)
    .subscribe((res: any) => {
      this.posts = res.data;
      console.log(this.posts);
    }, (err: any) => {
      this.error = true;
      this.errorMessage = "Error! Unable to fetch categories.";
    });
  }

  uploadImage(){
    this.fileUploader.nativeElement.click();
  }
}
