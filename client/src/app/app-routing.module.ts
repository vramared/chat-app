import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';


const routes: Routes = [
{
  path: '',
  component: HomeComponent,
  canActivate: [RedirectGuard]
},
{
  path: 'login',
  component: LoginComponent,
  canActivate: [RedirectGuard]
},
{
  path: 'signup',
  component: SignupComponent,
  canActivate: [RedirectGuard]
},
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
