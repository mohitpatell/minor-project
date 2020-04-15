import { Component, OnInit } from '@angular/core';
import { BookOperationService } from '../Services/book-operation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  computer;
  civil;
  mechnical;
  it;
  other;
  electrical;
  constructor(public service: BookOperationService) { }

  ngOnInit() {
    this.service.getBookComputer()
    .subscribe(result=> {
      this.computer = result.books[0]
    })

    this.service.getBookMechinical()
    .subscribe(result=> {
      this.mechnical = result.books[0]
    })

    this.service.getBookCivil()
    .subscribe(result=> {
      this.civil = result.books[0]
    })

    this.service.getBookIT()
    .subscribe(result=> {
      this.it = result.books[0]
    })

    this.service.getBookElectrical()
    .subscribe(result=> {
      this.electrical = result.books[0]
    })

    this.service.getBookOther()
    .subscribe(result=> {
      this.other = result.books[0]
    })
  }

}
