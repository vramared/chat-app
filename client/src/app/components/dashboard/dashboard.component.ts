import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { UserService } from '../../user.service';
import { ChatService } from '../../chat.service';
import { NodeWithI18n } from '@angular/compiler';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    data: any;
    messages = [];

    constructor(
        private userService: UserService,
        private chatService: ChatService,
        private router: Router
    ) {
        this.data = {};
    }

    ngOnInit(): void {
        this.chatService.getChats().subscribe(
            (res) => (this.data = res),
            (err) => this.logoutUser()
        );
        this.chatService.setupSocketConnection();
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
        };
        this.chatService.sendMsg(msg);
        this.showMsg(msg);
        form.value = '';
    }

    logoutUser() {
        this.userService.deleteToken();
        this.router.navigate(['/']);
    }
}
