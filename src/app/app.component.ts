import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public href;
  public show:boolean;
  constructor(public http:HttpClient, private router: Router, public location: Location, public auth:AuthService){
    this.auth.checkLocalStorage();
    router.events.subscribe((val) => {
      if(location.path() == '/signup' || location.path() == '/login' ){
        this.href = location.path();
        this.show=false;
      } else {
        this.href = 'Home'
        this.show=true;
      }
    });
  }
    ngOnInit(){
    }

}
