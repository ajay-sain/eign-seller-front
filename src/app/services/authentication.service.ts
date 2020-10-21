import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http : HttpClient) { }
  checkAythentication(user){
    return this.http.get('/api/users/'+user,{});
  }
  authenticateUser(sellerId,password):Observable<HttpResponse<Object>>{
    //post service
    return this.http.post('/api/authentication/login',{
      sellerId,
      password
    },{
      observe: "response"
    });
  }
  logoutUser(){
    return this.http.post('/api/logout',{});
  }
  registerSeller(data){
    return this.http.post('/api/authentication/register',data);
  }
    
}


