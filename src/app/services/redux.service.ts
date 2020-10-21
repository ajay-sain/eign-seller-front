import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root'
})
export class ReduxService {

  constructor(private store : Store<any>) { }
  navInfo(){
    return this.store.select('navReducer');
  }
  userInfo(){
    return this.store.select('userReducer');
  }
}
