import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers'
@NgModule({
  exports:[StoreModule],
  imports: [
    // CommonModule
    StoreModule.forRoot(reducer,{
      initialState:{}
    })
  ]
})
export class ReduxModule { }
