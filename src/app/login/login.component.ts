import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginform: FormGroup;
  public submited: Boolean = false;
  constructor(public auth:AuthService) { }

  ngOnInit() {
    this.loginform = new FormGroup({
      username: new FormControl(null, {validators:[Validators.required, Validators.minLength(2), Validators.maxLength(40)]}),
      password: new FormControl(null, {validators:[Validators.required]})
    })
  }

  login(){
    this.submited = true;
    if(this.loginform.invalid){
      return;
    }
    console.log(this.loginform.value);
    this.auth.login(this.loginform.value);
  }

}
