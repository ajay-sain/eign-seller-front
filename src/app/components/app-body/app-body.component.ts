import { Component, OnInit } from '@angular/core';
import { ReduxService } from 'src/app/services/redux.service';

@Component({
  selector: 'app-app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.css']
})
export class AppBodyComponent implements OnInit {
  navInfo:any;
  constructor(private reduxService:ReduxService) { }

  ngOnInit(){
    this.reduxService.navInfo().subscribe(data=>{
        this.navInfo = data
      })
    
      
  }

}
