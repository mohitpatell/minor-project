import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopListComponent } from './shop-list/shop-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AddBookComponent } from './add-book/add-book.component';
import { SignupComponent } from './signup/signup.component';
import { SingleBookComponent } from './single-book/single-book.component';

const routes:Routes=[
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'shop',
    component:ShopListComponent
  },
  {
    path:'singlebook/:id',
    component:SingleBookComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'addbook',
    component:AddBookComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'',
    component:HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ShopListComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    LoginComponent,
    AddBookComponent,
    SignupComponent,
    SingleBookComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
