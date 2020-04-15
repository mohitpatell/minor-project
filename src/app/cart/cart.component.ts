import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { AuthService } from '../Services/auth.service';
declare var Razorpay:any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public itemlist = [];
  public total = 0;
  public options;
  public rzp1;
  constructor(public common: CommonService,public auth: AuthService) { }

  ngOnInit() {
    this.loadScript();
    this.itemlist = this.common.getCartItems();
    for(let i=0; i<this.itemlist.length; i++){
      this.total = this.total + this.itemlist[i].price;
    }

  }

  removeAllItems(){
    this.common.removeCartItems();
  }

  removeParticularItem(item){
    //console.log('hit')
    const itempresent = this.itemlist.filter(i => i.title != item.title);
    //console.log(itempresent);
    this.common.addProductToCart(itempresent);
    this.itemlist=this.common.getCartItems();

    this.total = this.total - item.price;
  }

  increaseQuantity(item){

          const itempresent = this.itemlist.filter(i => i.title == item.title)[0];
          itempresent.quantity+=1;
          itempresent.price= itempresent.originalprice * itempresent.quantity;
          const cartitems = this.itemlist.filter(i => i.title != item.title)
          cartitems.push(itempresent);
          this.common.addProductToCart(cartitems);

          this.total = this.total + item.originalprice;
  }

  decreaseQuantity(item){

    if(item.quantity!=1){
      const itempresent = this.itemlist.filter(i => i.title == item.title)[0];
      itempresent.quantity-=1;
      itempresent.price= itempresent.originalprice * itempresent.quantity;
      const cartitems = this.itemlist.filter(i => i.title != item.title)
      cartitems.push(itempresent);
      this.common.addProductToCart(cartitems);

      this.total = this.total - item.originalprice;

    }
  }

  buy() {
    let amount = this.total * 100;
    this.options = {
      "key": "rzp_test_Qm2JvWeSfntpmn",
      "amount": `${amount}`, // 2000 paise = INR 20
      "name": `${this.auth.username}`,
      "description": "Second Hand",
      // "image": "/assets/images/logo.png",
      "handler": function (response){
        console.log(response)
          alert("Payment Successfull");
      },
      "prefill": {
        "name": `${this.auth.username}`,
        "email": `email@email.com`
      },
      "notes": {
          "address": "Hello World"
      },
      "theme": {
          "color": "#F37254"
      }
  };
    this.rzp1 = new Razorpay(this.options);
    this.rzp1.open();
    // this.modal.openModal('#courseModal');
  }

  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    console.log(script);
}
}
