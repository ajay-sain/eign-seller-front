import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toolsForMe';
  constructor(private authenticationServices : AuthenticationService,private store:Store){
    if(JSON.parse(localStorage.getItem("id"))!=null){
      this.authenticationServices.checkAythentication(JSON.parse(localStorage.getItem("id"))).subscribe(data=>{
        this.store.dispatch({'type':"UPDATE_USER_DETAILS",payload:data});
      })
    }
    
  }
}
