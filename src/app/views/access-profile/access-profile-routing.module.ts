import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessProfileComponent } from './access-profile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'permission'
    },
        
    children: [
      {
        path: 'accessprofile',
        redirectTo: 'accessprofile'
      },
      {
        path: 'accessprofile',
        component: AccessProfileComponent,
        data: {
          title: 'accessprofile'
        }
      }
  ]
  }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AccessProfileRoutingModule {}