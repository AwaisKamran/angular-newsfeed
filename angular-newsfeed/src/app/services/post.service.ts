import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url;
  constructor( 
    private http: HttpClient,
    private constantsService: ConstantsService
  ){
    this.url = this.constantsService.url;
  }

  createPost(fd){
    return this.http.post(`${this.url}api/Post`, fd);
  }

  getCategories(){
    return this.http.get(`${this.url}api/Category`);
  }

  getTimelinePosts(id){
    return this.http.get(`${this.url}api/UserPosts/${id}`);
  }

  getCategoryPosts(){
    return this.http.get(`${this.url}api/CategoryPosts`);
  }

  getPostById(id){
    return this.http.get(`${this.url}api/Post/${id}`);
  }

  getAllPosts(){
    return this.http.get(`${this.url}api/Post/`);
  }

  getUnApprovedPosts(){
    return this.http.get(`${this.url}api/PostApproval`);
  }

  approvePost(id){
    return this.http.put(`${this.url}api/PostApproval/${id}`, {});
  }
}
