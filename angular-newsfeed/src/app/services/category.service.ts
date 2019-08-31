import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url;
  constructor( 
    public http: HttpClient,
    public constantsService: ConstantsService
  ){
    this.url = this.constantsService.url;
  }

  getCategory(){
    return this.http.get(`${this.url}api/Category`);
  }

  createCategory(categoryObj){
    return this.http.post(`${this.url}api/Category`, categoryObj);
  }

  getPostByCategory(category){
    return this.http.post(`${this.url}api/CategoryPosts`, { "categoryName": category });
  }
}
