import { Component } from '@angular/core';
const logo = require('../assets/logo.png');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-newsfeed';
  currentTime = new Date().toUTCString();
  logoImage = logo;
}
