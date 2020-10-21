import { Injectable, ɵConsole } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = JSON.parse(localStorage.getItem('token'));
    if(token != undefined){
      request = request.clone({
        setHeaders: { 
            Authorization: token
        }
      });
    }
    return next.handle(request);
  }
}
