import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppBodyComponent } from './components/app-body/app-body.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/app-body/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/app-body/products/products.component';
import { ReduxModule } from './modules/redux/redux.module';
import { AuthenticationComponent } from './components/app-body/authentication/authentication.component';
import { RoutsModule } from './modules/routs/routs.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterProductComponent } from './components/app-body/register-product/register-product.component';
import { AuthInterceptor } from './auth.interceptor';
import { EditFormComponent } from './components/app-body/edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppBodyComponent,
    FooterComponent,
    PageNotFoundComponent,
    ProductsComponent,
    AuthenticationComponent,
    RegisterProductComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReduxModule,
    RoutsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
