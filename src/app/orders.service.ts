import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  userHeader : any = {token : localStorage.getItem("userToken")}

  baseUrl : string = "https://ecommerce.routemisr.com"
  constructor(private _HttpClient:HttpClient) { }

  checkOut(cartID:string , formValue:any ):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartID}?url=http://localhost:4200`,
    {
      shippingAdress: formValue ,
    },{headers : this.userHeader}
    )
  }
}
