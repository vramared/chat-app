import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../chat.service';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
    data = {
        name: 'Vineet',
    };
    messages = [];
    id: any;

    constructor(private chatService: ChatService, private router: Router) {}

    ngOnInit(): void {
        var endpoints = this.router.url.split('/');
        this.id = endpoints[endpoints.length - 1];
        this.chatService.joinRoom(this.id);
        this.chatService.getMsg(this.showMsg.bind(this));
    }

    showMsg(msg) {
        this.messages.push(msg);
    }

    sendMsg(event) {
        event.preventDefault();
        const form = event.target.querySelector('#msg');
        const text = form.value;
        const msg = {
            text: text,
            sender: this.data.name,
            time: Date.now(),
            chat_id: this.id,
        };
        this.chatService.sendMsg(msg);
        this.showMsg(msg);
        form.value = '';
    }

    navigateBack() {
        this.chatService.leaveRoom(this.id);
        this.router.navigate(['/dashboard']);
    }
}
