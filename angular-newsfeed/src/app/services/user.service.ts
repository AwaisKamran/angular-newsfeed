import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:56003/";
  public loggedIn: boolean;
  constructor(private http: HttpClient) {
    if(localStorage.getItem("userId")) this.loggedIn = true;
    else this.loggedIn = false;
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

