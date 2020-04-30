import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';
import { ChatService } from '../../chat.service';

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
        this.chatService.getMsg();
    }

    showMsg(msg) {
        this.messages.push(msg);
    }

    sendMsg(event) {
        event.preventDefault();
        const form = event.target.querySelector('#msg');
        const msg = form.value;
        this.chatService.sendMsg(msg);
        this.showMsg(msg);
        form.value = '';
    }

    logoutUser() {
        this.userService.deleteToken();
        this.router.navigate(['/']);
    }
}
