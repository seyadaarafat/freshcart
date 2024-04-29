import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartItemNumNav : string = ""
 isLogin: boolean = false;

 constructor(private _AuthService:AuthService , private _Router : Router,private _CartService:CartService){}

 ngOnInit(): void {

      this._CartService.cartItemsNum.subscribe( ()=>{
      this.cartItemNumNav =  this._CartService.cartItemsNum.getValue()
      })

     this._AuthService.userDataVar.subscribe(()=>{
      if (this._AuthService.userDataVar.getValue() == null)
      {
        this.isLogin=false
      }else
      {
        this.isLogin=true
      }
     })
 }

 logout(){
  localStorage.removeItem("userToken");
  this._AuthService.saveDataMethod()
  this._Router.navigate(['/login'])

 }
}
