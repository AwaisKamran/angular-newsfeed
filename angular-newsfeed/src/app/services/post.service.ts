import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "http://localhost:56003/";
  constructor(private http: HttpClient) { }

  createPost(fd){
    return this.http.post(`${this.url}api/Post`, fd);
  }

  getCategories(){
    return this.http.get(`${this.url}api/Category`);
  }

  getTimelinePosts(){
    return this.http.get(`${this.url}api/Post`);
  }
}
