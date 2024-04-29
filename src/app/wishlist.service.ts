import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  userHeader : any = {token : localStorage.getItem("userToken")}

  baseUrl : string = "https://ecommerce.routemisr.com"

  constructor(private _HttpClient:HttpClient) { }
  
  addToWhishListApi(pId : string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist` ,
    {
      productId: pId
    },{headers : this.userHeader}
    ) 
  }

  getWishListApi():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,{headers : this.userHeader})
  }

  removeWishListApi(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${pId}`,{headers : this.userHeader})
  }

}
