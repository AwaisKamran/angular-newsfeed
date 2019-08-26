import { Component } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';

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
  constructor(public dialog: MatDialog){}
}