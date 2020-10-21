import { Component, OnInit, ɵConsole } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service'
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  formBlock : string = "login";
  formModel : boolean = true;
  password : string = "";
  mapArr : any[] = [...Array(8).keys()].map(i => false);
  constructor(private store : Store,private router : Router,private authenticationServices : AuthenticationService) { 
    this.store.dispatch({type:'ACTIVATE_ROUTE',payload:{main:"authentication",sub:"none"}})
    // if( JSON.parse(localStorage.getItem("loginData"))){
    //   this.router.navigate(['home']);
    // }
  }


  ngOnInit(): void {
    
  }
  registerSeller(data){
    this.authenticationServices.registerSeller(data).subscribe(success=>{
      window.alert(success);
    },err=>{
      window.alert(err.error.text);
    })
  }

  validateField(data,block){
    if(block==0 ){
      if(data != "")
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(block==1 ){
      if(data != "")
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(block==2){
      if(data != "")
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(block==3){
      if(data != "" && /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(data))
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(block==4 ){
      if(data != "" &&  /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(data))
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(block==5){
      if(data != ""  &&  /^[6-9]\d{9}$/.test(data))
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(block==6){
      if(data != "" && /(?=.{8,})(?=.*[!@#$%^&*])(?=.*[0-9])/.test(data)){
        this.mapArr[block] = "true";
        this.password = data;
      }
      else
      this.mapArr[block] = false;
    }
    if(block==7){
      if(data != "" && this.password == data)
        this.mapArr[block] = "true";
      else
      this.mapArr[block] = false;
    }
    if(this.mapArr.every(i=>i=="true"))
      this.formModel = false;
    else
      this.formModel = true;
  }
  switchForm(data){
    if(this.formBlock != data)
      this.formBlock = data;
  }

  loginUser(event) {
    const sellerId = event.sellerId;
    const password = event.password;
    this.authenticationServices.authenticateUser(sellerId,password).subscribe(data=>{ 
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.headers.get("authorization")));
      this.store.dispatch({'type':"UPDATE_USER_DETAILS",payload:data.body});
      let str = "Happy to see you hear "+ data.body && data.body['ownerName']
      localStorage.setItem("id", JSON.stringify(data.body["sellerId"]));
      window.alert( str);
      this.router.navigate(['products']);
    },err=>{
      console.log(err);

      window.alert(err.error)
    })
  }
}
