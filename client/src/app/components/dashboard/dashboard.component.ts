import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(private userService : UserService,
              private chatService : ChatService, 
              private router : Router) { 
                this.data = {};
              }

  ngOnInit(): void {
    this.chatService.getChats().subscribe(
      res => this.data = res,
      err => this.logoutUser()
    );
  }

  logoutUser() {
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }


}
