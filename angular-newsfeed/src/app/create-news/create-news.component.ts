import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConstantsService } from '../services/constants.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  public data = {
    heading: undefined,
    source: undefined,
    owner: undefined,
    news: undefined,
    tag: undefined,
    category: undefined
  };
  
  public selectedFile: File = null;
  public imageUrl: any = "../../assets/placeholder-post.png";
  public categories: any;
  public tags: string[] = [];
  public currentTime = new Date().toUTCString();
  public error: boolean = false;
  public errorMessage: string = "Error! Please fill in all the fields.";
  public success: boolean = false;
  public successMessage: string = "Congratulations! your news is posted successfully.";

  @ViewChild('uploader', { static: false }) fileUploader;
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public postService: PostService,
    public constantsService: ConstantsService,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  addTags() {
    if (this.data.tag) {
      this.tags.push(`#${this.data.tag.trim().toLowerCase()}`);
      this.data.tag = undefined;
    }
  }

  createPost() {
    if (
      this.data &&
      this.data.heading &&
      this.data.source &&
      this.data.owner &&
      this.data.news &&
      this.tags && this.tags.length > 0 &&
      this.data.category
    ) {
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
          this.reload.emit();
        }, (err: any) => {
          this.error = true;
          this.errorMessage = "Error! Internal server error";
        });
    }
    else {
      this.success = false;
      this.error = true;
      this.errorMessage = "Error! Please fill in all the fields.";
    }
  }

  clearDataFields() {
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
    reader.onload = function () {
      container.imageUrl = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  uploadImage() {
    this.fileUploader.nativeElement.click();
  }

  getCategories() {
    this.postService.getCategories()
      .subscribe((res: any) => {
        this.categories = res.data;
      }, (err: any) => {
        this.error = true;
        this.errorMessage = "Error! Unable to fetch categories.";
      });
  }
}
