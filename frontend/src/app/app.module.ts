import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from './common.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SignupComponent ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,
ReactiveFormsModule],
  providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
