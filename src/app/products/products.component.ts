import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit {
  inputValue:string = ""



  constructor(private _ProductsService:ProductsService, private _CartService:CartService, private toastEvokeService: ToastEvokeService){}

  products:Product[]=[]
  Categories:any[]=[]

 
  ngOnInit(): void {
    
    localStorage.setItem("currentPage" , "/products")

     //get all products
    this._ProductsService.getAllProductsApi().subscribe({
      next:(res)=>{
        this.products = res.data
        
      }
    });

  }


  addCartBtn(pId:string)
  {
   this._CartService.addToCartApi(pId).subscribe({
    next: (res) =>{
      this.toastEvokeService.success('Success', res.message).subscribe();
      this._CartService.cartItemsNum.next(res.numOfCartItems) 
      
    }
   })
  

  }

  

}
