import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product'; 
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit {
 

  cartItems: any = []
  totalPrice:string=""
  cartId:string =""
 
  

  constructor( private toastEvokeService: ToastEvokeService,private _CartService:CartService , private _Router:Router){}

  //start
  ngOnInit(): void {
    
    localStorage.setItem("currentPage" , "/cart")

    this._CartService.getAllCartsCartItemsApi().subscribe({
      next: (res) => 
      {
        this.cartItems  = res.data.products
        this.totalPrice = res.data.totalCartPrice
        this.cartId = res.data._id

      },
      error: (err) => {console.log(err)}
    })

  }

  //delet
  removeItemBtn(pId:string)
  {
   this._CartService.removeItemsApi(pId).subscribe({
    next: (res) => 
    {
      this.toastEvokeService.success('Success',"Item Deleted Successfully").subscribe();
      this._CartService.cartItemsNum.next(res.numOfCartItems)
      this.cartItems = res.data.products
      
    }
   })

  }

  // update + , -
  updateItemsQuBtn(whichBtn:string , pCount:string , pId:string)
  {
    if (whichBtn == "plus") 
    {
      pCount =( Number(pCount) + 1).toString()
    }else
    {
      pCount =( Number(pCount) - 1).toString()
      if (Number(pCount) == 0) 
      {
        this.removeItemBtn(pId)
      }
    }
    this._CartService.updateCartItemQuApi(pId , pCount).subscribe(
      {
      next: (res) =>
       {
        this.cartItems = res.data.products
      },
      error: (err) => {console.log(err)
      }
    })
  }

  //clear
  clearCart():void{
    this._CartService.clearCartApi().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.cartItems = null
          this.totalPrice = ""
          this._Router.navigate(['/home'])
        }
      }
    })
  }
}
