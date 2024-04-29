import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PayComponent } from './pay/pay.component';
import { WishlistComponent } from './wishlist/wishlist.component';



const routes: Routes = [
  {path : '' , redirectTo : "home" , pathMatch : "full"},
  {path : "register" , component : RegisterComponent},
  {path : "login" , component : LoginComponent},
  {path : "home" , canActivate: [authGuard], component : HomeComponent},
  {path : "brands" , canActivate: [authGuard], component : BrandsComponent},
  {path : "cart" , canActivate: [authGuard], component : CartComponent},
  {path : "productDetails/:id" , component : ProductDetailsComponent },
  {path : "products" , canActivate: [authGuard], component : ProductsComponent},
  {path : "pay/:id" , canActivate: [authGuard], component : PayComponent},
  {path : "wishlist" , canActivate: [authGuard], component : WishlistComponent},
  {path : "categories" , canActivate: [authGuard], component : CategoriesComponent},
  {path : "**" , component : NotfoundComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
