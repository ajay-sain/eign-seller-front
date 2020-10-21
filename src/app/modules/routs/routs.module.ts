import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { PageNotFoundComponent } from 'src/app/components/app-body/page-not-found/page-not-found.component';
import { AuthenticationComponent } from 'src/app/components/app-body/authentication/authentication.component';
import { ProductsComponent } from 'src/app/components/app-body/products/products.component';
import { RegisterProductComponent } from 'src/app/components/app-body/register-product/register-product.component';

const routs : Routes = [
  {path:'', redirectTo: '/products',pathMatch: 'full'},
  {path:'authentication', component:AuthenticationComponent},
  {path:'products', component:ProductsComponent,canActivate:[AuthenticationGuard]},
  {path:'product-registration',component:RegisterProductComponent,canActivate:[AuthenticationGuard]},
  {path: '**', component: PageNotFoundComponent }
] 

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class RoutsModule { }
