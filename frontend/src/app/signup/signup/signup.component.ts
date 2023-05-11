import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup

  constructor(private fb: FormBuilder, private common:CommonService){
this.signupForm =this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required],
  name:['', Validators.required]
});
  }

  onSubmit() {
    if(this.signupForm.invalid){
      return
    }
    else{
      let body={
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        name: this.signupForm.value.name,
      }

      this.common.Signup(body).subscribe(res=>{
        console.log(res)

      
    
      })
    
   
    }
    
    }


    get username() {
      return this.signupForm.get('username');
    }
    
    get password() {
      return this.signupForm.get('password');
    }

    get name() {
      return this.signupForm.get('name');
    }
}
