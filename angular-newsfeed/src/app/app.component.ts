import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-newsfeed';
  animal: string;
  name: string;
  currentTime = new Date().toUTCString();

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ){}

  logout(){
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    this.router.navigate(['/register'])
  }
}