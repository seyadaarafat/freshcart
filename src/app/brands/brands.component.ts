import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent  implements OnInit {

  brands : any[] = []

  constructor(private _BrandsService:BrandsService) {}

  ngOnInit(): void {
    
    localStorage.setItem("currentPage" , "/brands")

    //get all brands
    this._BrandsService.getAllBrandsApi().subscribe({
      next: (res) =>
       { 
        this.brands = res.data
        
      },
      error: (err) => { console.log(err) }
    })

  } 

}
