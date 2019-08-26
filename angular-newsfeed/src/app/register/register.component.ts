import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private data: any = { };
  private registerForm: boolean = true;
  private error: boolean = false;
  private errorMessage: string = "Error! Please fill in all the fields.";
  private success: boolean = false;
  private successMessage: string = "Congratulations! you have registered successfully.";
  private selectedFile: File = null;
  private imageUrl: any = "../../assets/profile_placeholder.jpg";
  @ViewChild('uploader', { static: false }) fileUploader;

  constructor(
    private http: HttpClient
  ) { }

  toggleForm(){
    this.registerForm = ! this.registerForm;
  }

  login(){}

  register(){
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    fd.append('name', "Bruce Wayne");
    fd.append('email', "bruce@django.com");
    fd.append('password', "django");
    fd.append('ipAddress', "172.0.0.1");

    console.log(fd);

    this.http.post('http://localhost:56003/api/Users', fd)
      .subscribe((res: any) => {
        console.log(res.data);
      }, (err: any) => {});
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

  uploadImage(){
    this.fileUploader.nativeElement.click();
  }
}
