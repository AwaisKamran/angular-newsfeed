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
  private tags: string[] = [];
  private currentTime = new Date().toUTCString();
  private error: boolean = false;
  private errorMessage: string = "Error! Please fill in all the fields.";
  private success: boolean = false;
  private successMessage: string = "Congratulations! your news is posted successfully.";
  @ViewChild('uploader', { static: false }) fileUploader;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addTags() {
    if (this.data.tag) {
      this.tags.push(`#${this.data.tag}`);
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
      this.data.tag &&
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
      fd.append("Tags", this.data.tag);
      fd.append("postSource", this.data.source);
      fd.append("OwnerOfSource", this.data.owner);

      this.postService.createPost(fd)
        .subscribe((res: any) => {
          this.success = true;
          this.error = false;
          this.clearDataFields();
          this.isDisabled = false;
        }, (err: any) => {
          this.error = true;
          this.errorMessage = "Error! Internal server error";
        });
    }
    else{
      this.isDisabled = true;
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

  uploadImage(){
    this.fileUploader.nativeElement.click();
  }
}
