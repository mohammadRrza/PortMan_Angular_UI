import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwitchComponent } from './switch.component';
import { SwitchOperationComponent } from './switch-operation.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'switch'
    },
        
    children: [
      {
        path: '',
        redirectTo: 'switch'
      },
      {
        path: 'switch',
        component: SwitchComponent,
        data: {
          title: 'switch'
        }
      },
      {
        path: 'switchOperation',
        component: SwitchOperationComponent,
        data: {
          title: 'switchOperation'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SwitchRoutingModule {}