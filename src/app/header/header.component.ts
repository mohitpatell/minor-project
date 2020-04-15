import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin:boolean;
  constructor(public auth:AuthService, public route:Router) { }

  ngOnInit() {
    if(this.auth.loginstatus){
        this.isLogin= true;
    }
  }

  logout(){
    this.auth.logout();
    this.isLogin= false;
    this.auth.userAuthListener()
    .subscribe(result=> {
      console.log(result)
      this.isLogin= result.status;
      console.log(this.isLogin)
    })
  }

  addbook(){
    if(!this.isLogin){
      return alert("Please Login to Add Books")
    }
    this.route.navigate(['/addbook'])
  }

}
