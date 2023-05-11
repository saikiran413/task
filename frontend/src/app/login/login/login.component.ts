import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import * as cheerio from 'cheerio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private common:CommonService, private router:Router){

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
   

  });
  }


  get username() {
    return this.loginForm.get('username');
  }
  
  get password() {
 
    return this.loginForm.get('password');
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }

    let body={
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    localStorage.clear()

    this.common.login(body).subscribe(res=>{
  
      if(res){

      localStorage.setItem("token", res.token)

        this.router.navigateByUrl('/home')
      }
    })



  }
  
}
