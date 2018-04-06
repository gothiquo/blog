import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { PostListComponent } from './post-list/post-list.component';
import {HttpClientModule} from "@angular/common/http";
import { PostItemComponent } from './post-item/post-item.component';
import { SignupComponent } from './signup/signup.component';
import { PostFormComponent } from './post-form/post-form.component';
import { SigninComponent } from './signin/signin.component';
import {PostService} from "./services/post.service";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'posts', canActivate: [AuthGuardService], component: PostListComponent },
  { path: 'posts/view/:id', canActivate: [AuthGuardService], component: PostItemComponent },
  { path: 'posts/new', canActivate: [AuthGuardService], component: PostFormComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostItemComponent,
    SignupComponent,
    PostFormComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    PostService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
