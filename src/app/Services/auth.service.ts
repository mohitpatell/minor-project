import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginstatus: boolean;
  public token;
  public username;
  private userAuthStatus=new Subject<{status:boolean}>();

  constructor(private http:HttpClient, public router:Router){}

  gettoken(){
      return this.token;
  }

  isUserAuthenticated(){
    return this.loginstatus;
}

  signUp(values){
    const signupdata={
      name:values.name,
      username:values.username,
      email:values.email,
      gender:values.gender,
      number:values.contact_number,
      password:values.password
    }
      this.http.post('https://minor-api.herokuapp.com/addUser',signupdata)
      .subscribe(result=> {
        console.log(result);
      })
  }

  login(values){
    const logindata={
      username:values.username,
      password:values.password
    }
    this.http.post<{token: any, msg: string, username: string}>('https://minor-api.herokuapp.com/login',logindata)
    .subscribe(result =>{
      console.log(result);
      // if(result.msg != 'Login Successfully') return alert ("Invalid Credintial");
      this.token=result.token;
      if(this.token){
        this.loginstatus= true;
        this.username= result.username
        this.userAuthStatus.next({
          status: this.loginstatus
        })
        localStorage.setItem('token',this.token);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/']);
      }
    })
  }

  checkLocalStorage(){
      this.token= localStorage.getItem('token');
      if(!this.token){
          return;
      }
      this.loginstatus= true;
      this.userAuthStatus.next({
        status:this.loginstatus
      })
      this.username= localStorage.getItem('username');
  }

  userAuthListener(){
    console.log('ser')
    return this.userAuthStatus.asObservable();
  }

  removeLocalStorageItem(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  logout(){
    this.loginstatus=false;
    this.userAuthStatus.next({
        status:this.loginstatus
    })
    this.removeLocalStorageItem();
    console.log('logout hit')
    this.router.navigate(['/']);
}
}
