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
    }

    openChat(chat_id) {
        this.router.navigate([`/dashboard/${chat_id}`]);
    }

    logoutUser() {
        this.userService.deleteToken();
        this.router.navigate(['/']);
    }
}
