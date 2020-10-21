import { Injectable, ɵConsole } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReduxService } from '../services/redux.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  userInfo:any=false;
  constructor(private reduxService : ReduxService, private router : Router){
    this.reduxService.userInfo().subscribe(data=>{
      this.userInfo = data;
    })
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( JSON.parse(localStorage.getItem("token")) == null){
        this.router.navigate(['authentication']);
        return false;
      }
      else{
        return true;
      }
      return JSON.parse(localStorage.getItem("loginData"));
  }
}
