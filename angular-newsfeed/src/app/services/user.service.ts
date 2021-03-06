import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url;

  public loggedIn: boolean;
  public userType: boolean;
  
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) {
    if(localStorage.getItem("userId")) this.loggedIn = true;
    else this.loggedIn = false;

    this.userType = localStorage.getItem("userType") === "admin"? true: false;
    this.url = this.constantsService.url;
  }

  registerUser(userData) {
    return this.http.post(`${this.url}api/Users`, userData);
  }

  loginUser(data) {
    let header = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    );
    return this.http.post(`${this.url}api/Login`, data, { headers: header });
  }
}

