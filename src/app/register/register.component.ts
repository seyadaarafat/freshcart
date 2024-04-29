import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    isLoading : boolean = false ;
    errorMessage! : string ;
    constructor(private _AuthService :AuthService , private _Router:Router){}
    registerForm : FormGroup = new FormGroup({
      name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
      rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
      phone : new FormControl(null, [Validators.required, Validators.pattern(/^[01][0125][0-9]{9}$/) ])

    } , this.x)
    registerSubmitMethod(){
      this.isLoading = true
      this._AuthService.registerApi(this.registerForm.value).subscribe({
        next : (res)=>{
          console.log(res)
          this.isLoading = false
          this._Router.navigate(['/login'])
        },
        error : (err)=>{
          this.errorMessage = err.error.message
          this.isLoading = false
          }
      })
    }
    x(g:any){
      if(g.get('password')?.value == g.get('rePassword')?.value){
        return null
      }else{
        return {MatchedPassword: true} 
      }
    }
}
