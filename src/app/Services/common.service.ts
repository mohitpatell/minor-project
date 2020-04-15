import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class CommonService {
  constructor(){}

  addProductToCart(product: any){
    localStorage.setItem('product',JSON.stringify(product));
  }

  getCartItems(){
    return JSON.parse(localStorage.getItem('product'));
  }

  removeCartItems(){
    localStorage.removeItem('product')
  }
}
