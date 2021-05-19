import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResellerComponent } from './reseller.component';


const routes: Routes = [
    {
      path: '',
      data: {
        title: 'reseller'
      },
          
      children: [
        {
          path: '',
          redirectTo: 'reseller'
        },
        {
          path: 'resellers',
          component: ResellerComponent,
          data: {
            title: 'resellers'
          },
        }
     /*   {
          path: 'reseller-ports',
          component: ResellerComponent,
          data: {
            title: 'reseller-ports'
          }
        },*/
 
    ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ResellerRoutingModule {}