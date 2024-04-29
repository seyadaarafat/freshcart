import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading : boolean = false ;

  forgetFlag : boolean = true ;
  verifyFlag : boolean = false ;
  newPassFlag : boolean = false ;
  errorMessage! : string ;
  constructor(private _AuthService :AuthService , private _Router:Router){}

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
  })


   //***** 1 form **********/
  forgetForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email] )
  })


   //***** 2 form **********/
  verifyForm : FormGroup = new FormGroup({
    resetCode : new FormControl(null, [Validators.required] )
  })

   //***** 3 form **********/
  newPassForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    newPassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
  })


  forgetSubmitMethod(){
    this.isLoading = true

    this._AuthService.forgetApi(this.forgetForm.value).subscribe({

      next : (res)=>{

        this.isLoading = false

        if(res.message )
        {
          this.forgetFlag = false;
          this.verifyFlag = true;
          
        }
      },
      error : (err)=>{
        this.errorMessage = err.error.message
        console.log(err);
        
        this.isLoading = false
        }
    })
  }

  newPassSubmitMethod(){
    this.isLoading = true

    this._AuthService.newPassApi(this.newPassForm.value).subscribe({

      next : (res)=>{

        this.isLoading = false

        if(res.token )
        {
          console.log("new pass done");
          
        }
      },
      error : (err)=>{
        this.errorMessage = err.error.message
        console.log(err);
        
        this.isLoading = false
        }
    })
  }

  verifySubmitMethod(){
    this.isLoading = true

    this._AuthService.verifyApi(this.verifyForm.value).subscribe({

      next : (res)=>{

        this.isLoading = false

        if(res.status == "Success" )
        {
          this.verifyFlag = false;
          this.newPassFlag = true;
        }
      },
      error : (err)=>{
        this.errorMessage = err.error.message
        console.log(err);
        
        this.isLoading = false
        }
    })
  }

  loginSubmitMethod(){
    this.isLoading = true

    this._AuthService.loginApi(this.loginForm.value).subscribe({
      next : (res)=>{

        this.isLoading = false

        if(res.message == "success")
        {
          localStorage.setItem("userToken" , res.token);
          this._AuthService.saveDataMethod()
          this._Router.navigate(['/home'])
        }
      },
      error : (err)=>{
        this.errorMessage = err.error.message
        console.log(err);
        
        this.isLoading = false
        }
    })
  }
}
