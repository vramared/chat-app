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

  tokenExists() {
    const token = localStorage.getItem('token');
    if(token) return true;
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
