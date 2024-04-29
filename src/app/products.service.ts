import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl : string = "https://ecommerce.routemisr.com"

  constructor(private _HttpClient:HttpClient) { }

  getAllProductsApi():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`)
  }


  getSpecProdApi(_id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${_id}`)
  }


  getCategoriesApi():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }

}
