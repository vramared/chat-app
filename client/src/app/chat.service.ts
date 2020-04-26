import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly baseURL = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  getChats() {
    return this.http.get(`${this.baseURL}/chat`);
  }
}
