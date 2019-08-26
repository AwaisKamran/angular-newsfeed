import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  private data = {
    tag: undefined
  };

  private tags: string[] = [];
  currentTime = new Date().toUTCString();
  private error: boolean = false;
  private errorMessage: string = "Error! Please fill in all the fields.";
  private success: boolean = false;
  private successMessage: string = "Congratulations! your news is posted successfully.";
  constructor() { }

  addTags() {
    if (this.data.tag) {
      this.tags.push(`#${this.data.tag}`);
      this.data.tag = undefined;
    }
  }
}
