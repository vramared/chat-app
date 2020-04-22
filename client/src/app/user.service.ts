import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseURL = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  loginUser(email, password) {
    const data = {
      email: email,
      password: password
    };
    return this.http.post(`${this.baseURL}/login`, data);
  }

  signupUser(name, email, password) {
    const data = {
      name: name,
      email: email,
      password: password
    };
    return this.http.post(`${this.baseURL}/signup`, data);
  }
}
