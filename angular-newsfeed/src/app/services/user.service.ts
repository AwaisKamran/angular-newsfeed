import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '';

  constructor(private http: HttpClient) { }

  registerUser(userData){
    return this.http.post(this.url, userData).subscribe()
  }
}

