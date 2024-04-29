import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {


  currentCartId:string=""
  constructor (private _OrdersService:OrdersService , private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {

    // localStorage.setItem("currentPage" , "/pay")
    this._ActivatedRoute.params.subscribe( (p)=>{
      this.currentCartId = p['id']
  } )
  }


  addressForm : FormGroup = new FormGroup({
    details : new FormControl(null),
    phone : new FormControl(null),
    city : new FormControl(null),
  })

  addressFormSubmit()
  {
    this._OrdersService.checkOut(this.currentCartId , this.addressForm.value).subscribe({
      next: (res)=> { 
        window.location.href=res.session.url
       },
      error: (err) => { console.log(err) }
    })
    
  }

}
