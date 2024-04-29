import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsNum:BehaviorSubject<any> = new BehaviorSubject(null)

  baseUrl : string = "https://ecommerce.routemisr.com"

  userHeader : any = {token : localStorage.getItem("userToken")}

  constructor(private _HttpClient:HttpClient) { }

  addToCartApi(pId:string):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart` , {productId:pId} , {
      headers : this.userHeader
    })

  }

  
  updateCartItemQuApi(pId:string , pCount:string):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${pId}` , {count: pCount} , {
      headers : this.userHeader
    })

  }

  getAllCartsCartItemsApi():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`, {
      headers: this.userHeader
    })

  }


  removeItemsApi(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${pId}`, {
      headers: this.userHeader
    })

  }


  clearCartApi():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,{
      headers: this.userHeader
    })

  }

}

