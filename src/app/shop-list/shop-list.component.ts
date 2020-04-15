import { Component, OnInit } from '@angular/core';
import { BookOperationService } from '../Services/book-operation.service';
import { AuthService } from '../Services/auth.service';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  constructor(public book_Operation:BookOperationService, public auth: AuthService,public common: CommonService) { }
  public all_books;
  public cartitems;
  ngOnInit() {
    this.book_Operation.listbooks()
    .subscribe(result=> {
      console.log(result);
      this.all_books=result.books;
      console.log('typee',this.all_books);
    })
    // this.all_books=this.book_Operation.all_books_list;
  }

  addtobuy(id){
    console.log(this.auth.loginstatus);
    if(!this.auth.loginstatus){
      return alert("Please Login");
    }
    this.book_Operation.addToPurchaseCart(id);
  }

  addToCart(item){
    console.log(item);
    let product=this.common.getCartItems();
    let product_detail= {
      name: item.title,
      price: item.price
    }
    if(product == null){
      item.quantity=1;
      this.cartitems=[]
      this.cartitems.push(item);
      this.common.addProductToCart(this.cartitems);

    }else{
      this.cartitems = product;
      const result = this.cartitems.find(i=> i.title == item.title)
      if(result == null){
        item.quantity=1;
        this.cartitems.push(item);
        this.common.addProductToCart(this.cartitems);
      }else{
        alert("Item Already Exists in Cart");
      }
      //console.log(this.cartitems);

    }
}

categoryBooks(dept) {
  this.book_Operation.getDepartmentBook({department:dept})
  .subscribe(result=> {
    console.log(result)
    this.all_books=result.books;
  })
}

allbooks() {
  this.book_Operation.listbooks()
  .subscribe(result=> {
    console.log(result);
    this.all_books=result.books;
  })
}

}
