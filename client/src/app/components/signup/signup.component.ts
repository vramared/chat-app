import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }  
  
  signupUser(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    this.userService.signupUser(name, email, password).subscribe((res) => {
      console.log(res);
    });
  }
}
