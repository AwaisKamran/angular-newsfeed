import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public data: any = {
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    ipAddress: undefined
  };

  public registerForm: boolean = false;
  public error: boolean = false;
  public errorMessage: string = "Error! Please fill in all the fields.";
  public success: boolean = false;
  public successMessage: string = "Congratulations! you have registered successfully.";
  public selectedFile: File = null;
  public imageUrl: any = "../../assets/profile_placeholder.jpg";

  @ViewChild('uploader', { static: false }) fileUploader;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  toggleForm() {
    this.registerForm = !this.registerForm;
  }

  login() {
    if (
      this.data.email &&
      this.data.password
    ) {

      let data = {
        "email": this.data.email,
        "password": this.data.password
      };

      this.userService.loginUser(data)
        .subscribe((res: any) => {
          if (res.success) {
            this.userService.loggedIn = true;
            this.success = false;
            this.error = false;
            this.clearDataFields();
            localStorage.setItem("userType", res.data.type);
            localStorage.setItem("userId", res.data.userId);

            if (res.data.type === "user") this.router.navigate(['/timeline']).then(() => {
              window.location.reload();
            });

            if (res.data.type === "admin") this.router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          }
          else {
            this.success = false;
            this.error = true;
            this.errorMessage = "Error! Internal server error.";
          }
        }, (err: any) => {
          this.success = false;
          this.error = true;
          this.errorMessage = "Error! Invalid username or password.";
        });
    }
    else {
      this.error = true;
      this.errorMessage = "Error! Please fill in all the fields.";
    }
  }

  register() {
    this.data.ipAddress = localStorage.getItem("ipAddress") ? localStorage.getItem("ipAddress") : "172.0.0.1";
    if (
      this.data &&
      this.data.name &&
      this.data.email &&
      this.data.password &&
      this.data.confirmPassword &&
      this.data.ipAddress
    ) {
      if (this.data.password !== this.data.confirmPassword) {
        this.error = true;
        this.errorMessage = "Error! Password fields do not match.";
      }
      else {
        this.error = false;

        const fd = new FormData();
        fd.append('image', this.selectedFile);
        fd.append('name', this.data.name);
        fd.append('email', this.data.email);
        fd.append('password', this.data.password);
        fd.append('ipAddress', localStorage.getItem("ipAddress"));

        this.userService.registerUser(fd)
          .subscribe((res: any) => {
            if (res.data.success) {
              this.success = true;
              this.error = false;
              this.clearDataFields();
              this.imageUrl = "../../assets/profile_placeholder.jpg"
              localStorage.setItem("userId", res.data);
            }
            else {
              this.success = false;
              this.error = true;
              this.errorMessage = "Error! Internal server error.";
            }
          }, (err: any) => {
            this.success = false;
            this.error = true;
            this.errorMessage = "Error! Internal server error.";
          });
      }
    }
    else {
      this.error = true;
      this.errorMessage = "Error! Please fill in all the fields.";
    }
  }

  clearDataFields() {
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
    reader.onload = function () {
      container.imageUrl = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  uploadImage() {
    this.fileUploader.nativeElement.click();
  }
}
