import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Product } from '../product';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products: Product[] = []
  wishlistData: string[] = []

  constructor(private _WishlistService: WishlistService, private toastEvokeService: ToastEvokeService, private _CartService: CartService) { }

  ngOnInit(): void {

    localStorage.setItem("currentPage", "/wishlist")
    this._WishlistService.getWishListApi().subscribe({
      next: (res) => {
        this.products = res.data
        const newData = res.data.map((item: any) => item._id)
        this.wishlistData = newData
      },
      error: (err) => { console.log(err) }
    })

  }

  addCartBtn(pId: string) {
    this._WishlistService.addToWhishListApi(pId).subscribe({
      next: (res) => {
        this.toastEvokeService.success('Success', res.message).subscribe();
        this._CartService.cartItemsNum.next(res.numOfCartItems)

      }
    })


  }

  addFav(pId: string): void {
    this._WishlistService.addToWhishListApi(pId).subscribe({
      next: (res) => {
        this.toastEvokeService.success('Success', res.message).subscribe();
        this.wishlistData = res.data

      },
      error: (err) => { console.log(err) }
    })
  }

  removeFav(pId: string): void {
    this._WishlistService.removeWishListApi(pId).subscribe({
      next: (res) => {
        this.toastEvokeService.success('Success', res.message).subscribe();
        this.wishlistData = res.data

        this._WishlistService.getWishListApi().subscribe({
          next: (res) => {
            this.products = res.data
          }
        })
      }
    })
  }

}
