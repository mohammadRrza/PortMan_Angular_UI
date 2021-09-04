import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadioComponent } from './radio.component';
import { RadioOperationComponent } from './radio-operationcomponent';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'radio'
    },
        
    children: [
      {
        path: '',
        redirectTo: 'radio'
      },
      {
        path: 'radio',
        component: RadioComponent,
        data: {
          title: 'radio'
        },
      },
      {
        path: 'radioOperation',
        component: RadioOperationComponent,
        data: {
          title: 'radioOperation'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RadioRoutingModule {}