import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  pId :string = ""
  oneProduct! : Product
  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService) {}

  ngOnInit(): void {
    // localStorage.setItem("currentPage" , "/productDetails/:id")
    this._ActivatedRoute.params.subscribe((p)=>{
      this.pId = p["id"]
      this._ProductsService.getSpecProdApi(this.pId).subscribe({
        next : (res) => {
          this.oneProduct = res.data
          
        }
      })
    })
  }

}
