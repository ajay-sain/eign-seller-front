import { Component, OnInit } from '@angular/core';
import { ReduxService } from 'src/app/services/redux.service';
import {Store} from '@ngrx/store';
import  { navigationLinks,privateNavigationLinks }  from 'src/app/constants/constants'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navInfo : any;
  userInfo : any ;
  userLinks : boolean = false;
  navigationLinks :any = navigationLinks;
  userNavigations : any = privateNavigationLinks;
  
  constructor(private reduxService : ReduxService,
    private store : Store<any>,
    private router : Router) { }

  ngOnInit(): void {
    
    this.reduxService.navInfo().subscribe(data=>{
      this.navInfo = data;
    })
    this.reduxService.userInfo().subscribe(data=>{
      this.userInfo = data;
    })
  }
  showNavigation (){
    this.store.dispatch({type:'TOGGLE_NAVIGATION_VISIBILITY'})
  }
  working(){
    console.log( 'working')
  }
  showLinks(){
    this.userLinks = !this.userLinks;
  }
  logOut(){
    this.store.dispatch({type:'UPDATE_USER_DETAILS',payload:false})
    localStorage.clear();
    this.router.navigate(['authentication']);
  }
}
