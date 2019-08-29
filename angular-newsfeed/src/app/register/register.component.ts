import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private data: any = {
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    ipAddress: undefined
   };

  private registerForm: boolean = false;
  private error: boolean = false;
  private errorMessage: string = "Error! Please fill in all the fields.";
  private success: boolean = false;
  private successMessage: string = "Congratulations! you have registered successfully.";
  private selectedFile: File = null;
  private imageUrl: any = "../../assets/profile_placeholder.jpg";
  private isDisabled: boolean = false;
  private isLoginDisabled: boolean = false;

  @ViewChild('uploader', { static: false }) fileUploader;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  toggleForm(){
    this.registerForm = ! this.registerForm;
  }

  login(){
    if(
      this.data.email && 
      this.data.password
    ){

      let data ={
        "email": this.data.email,
        "password": this.data.password
      };

      this.isLoginDisabled = false;
      this.userService.loginUser(data)
        .subscribe((res: any) => {
          this.userService.loggedIn = true;
          this.success = false;
          this.error = false;  
          this.isLoginDisabled = false;
          this.clearDataFields();

          console.log("Login response");
          console.log(res.data);
          localStorage.setItem("userType", res.data.type);
          localStorage.setItem("userId", res.data.userId);

          if(res.data.type === "user") this.router.navigate(['/timeline'])
          if(res.data.type === "admin") this.router.navigate(['/admin'])
        }, (err: any) => {
          this.success = false;
          this.error = true;
          this.errorMessage = "Error! Internal server error.";
        });
    }
    else{
      this.isLoginDisabled = true;
      this.error = true;
      this.errorMessage = "Error! Please fill in all the fields.";
    }
  }

  register(){
    this.data.ipAddress = localStorage.getItem("ipAddress")? localStorage.getItem("ipAddress"): "172.0.0.1";
    if(
        this.data &&
        this.data.name &&
        this.data.email && 
        this.data.password && 
        this.data.confirmPassword &&
        this.data.ipAddress
      ){
        if(this.data.password !== this.data.confirmPassword){
          this.isDisabled = true;
          this.error = true;
          this.errorMessage = "Error! Password fields do not match.";
        }
        else {
          this.isDisabled = false;
          this.error = false;

          const fd = new FormData();
          fd.append('image', this.selectedFile);
          fd.append('name', this.data.name);
          fd.append('email', this.data.email);
          fd.append('password', this.data.password);
          fd.append('ipAddress', localStorage.getItem("ipAddress"));
      
          this.userService.registerUser(fd)
          .subscribe((res: any) => {
            this.success = true;
            this.error = false;  
            this.clearDataFields();  
            this.imageUrl = "../../assets/profile_placeholder.jpg"
            this.isDisabled = false;
            console.log("Registration response");
            console.log(res.data);
            localStorage.setItem("userId", res.data);
          }, (err: any) => {
            this.success = false;
            this.error = true;
            this.errorMessage = "Error! Internal server error.";
          });
      }
    }
    else{
      this.isDisabled = true;
      this.error = true;
      this.errorMessage = "Error! Please fill in all the fields.";
    }
  }

  clearDataFields(){
    this.data.name = undefined;
    this.data.email = undefined; 
    this.data.password = undefined; 
    this.data.confirmPassword = undefined;
    this.data.ipAddress = undefined;
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
