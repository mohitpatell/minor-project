import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookOperationService } from '../Services/book-operation.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  constructor(public route:ActivatedRoute, public bookOperation:BookOperationService) { }
  public bookid;
  public book;

  ngOnInit() {
    this.route.params.subscribe(result=>{
      console.log(result);
      this.bookid=result.id;
      this.bookOperation.get_a_book(this.bookid)
      .subscribe(result=>{
        console.log('suscribe');
        console.log(result);
        this.book= result.books[0];
        console.log(this.book,'booksd');
      })
    })
  }

}
