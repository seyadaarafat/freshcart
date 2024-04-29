import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inputValue:string = ""


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  categorySliserOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  constructor(private _ProductsService:ProductsService,
     private _CartService:CartService,
      private toastEvokeService: ToastEvokeService,
      private _WishlistService:WishlistService){}

  products:Product[]=[]
  Categories:any[]=[]
  wishlistData: string[] = []

 
  ngOnInit(): void {
    
    localStorage.setItem("currentPage" , "/home")

     //get all products
    this._ProductsService.getAllProductsApi().subscribe({
      next:(res)=>{
        this.products = res.data
        
      }
    });

      //get all categories
      this._ProductsService.getCategoriesApi().subscribe({
        next:(res) =>{
          this.Categories = res.data
          
        }
  })

   this._WishlistService.getWishListApi().subscribe({
    next: (res) => 
      {
        const newData = res.data.map( (item:any)=> item._id  )
        this.wishlistData = newData
       },
      error: (err) => {console.log(err) }
   })

  

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

  addFav(pId:string):void{
   this._WishlistService.addToWhishListApi(pId).subscribe({
    next: (res) => {
      this.toastEvokeService.success('Success', res.message).subscribe();
      this.wishlistData = res.data
  
       },
    error: (err) => {console.log(err) }
   })
  }

  removeFav(pId: string):void{
    this._WishlistService.removeWishListApi(pId).subscribe({
      next: (res) => 
      { 
         this.toastEvokeService.success('Success', res.message).subscribe();
         this.wishlistData = res.data
      }
    })
  }

}
