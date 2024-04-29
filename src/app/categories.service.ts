import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  userHeader : any = {token : localStorage.getItem("userToken")}
  baseUrl : string = "https://ecommerce.routemisr.com"

  constructor(private _HttpClient:HttpClient) { }

  //get all categories
  getCategoriesApi():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }

  //get specfic subcategories
  getSubCategoriesApi(_id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/subcategories/${_id}` ,{headers : this.userHeader})
  }
  
}
