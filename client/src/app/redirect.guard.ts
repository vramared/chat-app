import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import  { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private userService:  UserService,
              private router: Router) { }
  canActivate() {
    if(this.userService.tokenExists()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
