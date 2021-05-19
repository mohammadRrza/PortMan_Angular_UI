import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionComponent } from './user-permission.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'permission'
    },
        
    children: [
      {
        path: 'userpermission',
        redirectTo: 'userpermission'
      },
      {
        path: 'userpermission',
        component: UserPermissionComponent,
        data: {
          title: 'userpermission'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserPermissionRoutingModule {}