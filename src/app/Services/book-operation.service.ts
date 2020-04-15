import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookOperationService {

  public all_books_list: any;
  constructor(public http: HttpClient) { }

  addBook(data){
    let bookdata= new FormData();
    bookdata.append('name',data.bookname);
    bookdata.append('username',localStorage.getItem('username'));
    bookdata.append('contactno',data.number);
    bookdata.append('department',data.department);
    bookdata.append('price',data.price);
    bookdata.append('desc',data.desc);
    bookdata.append('image',data.image1);
    bookdata.append('image',data.image2);
    this.http.post('https://minor-api.herokuapp.com/addbook',bookdata)
    .subscribe(result=> {
      console.log(result);
    alert("Book Added Successfully");
    })

  }

  listbooks(){
   return this.http.get <{status:string,books:any}>('https://minor-api.herokuapp.com/approvedbooks');
  }

  get_a_book(id){
    const book={
      id:id
    }
    console.log('bookid0',book)
    return this.http.post<{status:string,books:any}>('https://minor-api.herokuapp.com/findbook',book);
   }

   addToPurchaseCart(bookid){
     const book={
       bookid:bookid,
       username:localStorage.getItem('username')
     }
     console.log(book);
      this.http.post('https://minor-api.herokuapp.com/addtobuy',book)
      .subscribe( result => {
        console.log(result)
        alert("Book Added to Purchasing cart");
      })
   }

   getDepartmentBook(data){
    return this.http.post<{status:string,books:any}>('https://minor-api.herokuapp.com/category-book',data);
   }
}
