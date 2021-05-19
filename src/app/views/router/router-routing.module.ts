import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutersComponent } from './router.component';
import { RoutersOperationComponent } from './router-operation.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'router'
    },
        
    children: [
      {
        path: '',
        redirectTo: 'router'
      },
      {
        path: 'router',
        component: RoutersComponent,
        data: {
          title: 'router'
        }
      },

      {
        path: 'routerOperation',
        component: RoutersOperationComponent,
        data: {
          title: 'routerOperation'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoutersRoutingModule {}