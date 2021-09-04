import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackupManagementComponent } from './backup-management.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'backup-management'
    },
        
    children: [
      {
        path: '',
        redirectTo: 'backup-management'
      },
      {
        path: 'backup-management',
        component: BackupManagementComponent,
        data: {
          title: 'backup-management'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BackupManagementRoutingModule {}