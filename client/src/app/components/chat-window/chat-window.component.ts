import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../chat.service';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
    @ViewChild('scrollBottom') private scrollBottom: ElementRef;

    data: any;
    messages = [];
    id: any;

    constructor(private chatService: ChatService, private router: Router) {}

    ngOnInit(): void {
        var endpoints = this.router.url.split('/');
        this.id = endpoints[endpoints.length - 1];
        this.chatService.getChats().subscribe((res) => (this.data = res));
        this.chatService.joinRoom(this.id);
        this.chatService.getMsg(this.showMsg.bind(this));
    }

    showMsg(msg) {
        this.messages.push(msg);
        this.scrollToBottom();
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

    scrollToBottom() {
        console.log(this.scrollBottom.nativeElement.scrollHeight);
        this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    }

    navigateBack() {
        this.chatService.leaveRoom(this.id);
        this.router.navigate(['/dashboard']);
    }
}
