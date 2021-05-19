import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DslamPortComponent } from './dslam-port.component';
import { DslamPortOperationComponent } from './dslamPort-operation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'dslamport'
    },
        
    children: [
      {
        path: '',
        redirectTo: 'dslamport'
      },
      {
        path: 'dslamport',
        component: DslamPortComponent,
        data: {
          title: 'dslamport'
        }
      },
    {
      path: 'dslamPortOperation',
      component: DslamPortOperationComponent,
      data: {
        title: 'dslam-portOperation'
      }
    }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DslamPortRoutingModule {}