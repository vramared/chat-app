import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

import { UserService } from './user.service';
import { ChatService } from './chat.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        ChatWindowComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [
        UserService,
        ChatService,
        AuthGuard,
        RedirectGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
