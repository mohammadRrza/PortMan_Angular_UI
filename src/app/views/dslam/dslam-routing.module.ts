import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DslamComponent } from './dslam.component';
import { DslamOperationComponent } from './dslam-operation.component';


const routes: Routes = [
    {
      path: '',
      data: {
        title: 'dslams'
      },
          
      children: [
        {
          path: '',
          redirectTo: 'dslam'
        },
        {
          path: 'dslam',
          component: DslamComponent,
          data: {
            title: 'dslam'
          }
        },
      {
        path: 'dslamOperation',
        component: DslamOperationComponent,
        data: {
          title: 'dslamOperation'
        }
      }
    ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DslamRoutingModule {}