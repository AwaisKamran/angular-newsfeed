import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private data: any = { };q
  private registerForm: boolean = true;
  private error: boolean = false;
  private errorMessage: string = "Error! Please fill in all the fields.";
  private success: boolean = false;
  private successMessage: string = "Congratulations! you have registered successfully.";
  private selectedFile: File = null;
  @ViewChild('uploader', { static: false }) fileUploader;

  constructor() { }

  toggleForm(){
    this.registerForm = ! this.registerForm;
  }

  login(){}

  register(){}

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      return this.upload();
    }
  }

  uploadImage(){
    this.fileUploader.nativeElement.click();
  }

  upload() {
    /*const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post('http://example.com/upload/image', fd)
      .subscribe((res: any) => {
        this.image = res.data;
      }, (err: any) => {
          // Show error message or make something.
    });*/
  }

}
