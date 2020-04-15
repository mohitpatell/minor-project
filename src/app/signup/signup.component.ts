import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupform: FormGroup;
  public submited: Boolean = false;
  constructor(public auth:AuthService) { }

  ngOnInit() {
    this.signupform = new FormGroup({
      name: new FormControl(null, {validators:[Validators.required, Validators.minLength(2), Validators.maxLength(40)]}),
      username: new FormControl(null, {validators:[Validators.required, Validators.minLength(2), Validators.maxLength(40)]}),
      email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
      gender: new FormControl(null, {validators:[Validators.required]}),
      contact_number: new FormControl(null, {validators:[Validators.required, Validators.minLength(9), Validators.maxLength(10)]}),
      password: new FormControl(null, {validators:[Validators.required]}),
      cpassword: new FormControl(null, {validators:[Validators.required]}),

    })
  }

  addUser(){
    this.submited = true;
    if(this.signupform.invalid){
      return
    }
    if(this.signupform.value.password != this.signupform.value.cpassword){
      alert("Password Not match");
        return;
    }
    console.log(this.signupform.value);
    this.auth.signUp(this.signupform.value);
  }

}
