import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    readonly baseURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    socket: any;

    getChats() {
        return this.http.get(`${this.baseURL}/dashboard`);
    }

    sendMsg(msg) {
        this.socket.emit('chat', msg);
    }

    getMsg(showMsg) {
        this.socket.on('chat', (msg) => {
            showMsg(msg);
        });
    }

    setupSocketConnection() {
        this.socket = io(this.baseURL, {
            path: '/dashboard',
        });
    }
}
