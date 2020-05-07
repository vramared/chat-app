import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    readonly baseURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {
        this.setupSocketConnection();
    }

    socket: any;

    getChats() {
        return this.http.get(`${this.baseURL}/dashboard`);
    }

    getChatInfo(id) {
        return this.http.get(`${this.baseURL}/chat-info/${id}`);
    }

    joinRoom(room) {
        this.socket.emit('join-room', room);
    }

    leaveRoom(room) {
        this.socket.emit('leave-room', room);
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
