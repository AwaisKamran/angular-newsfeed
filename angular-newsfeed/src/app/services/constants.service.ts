import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public postImagesPath = 'http://localhost:56003/Images/Post/';
  public userImagesPath = 'http://localhost:56003/Images/User/';
  public url = 'http://localhost:56003/';

  constructor() { }
}
