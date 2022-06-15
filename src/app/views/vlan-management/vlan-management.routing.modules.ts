import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VlanManagementComponent } from './vlan-management.component';

const routes: Routes = [
    {
      path: 'vlans',
      component: VlanManagementComponent,
      data: {
        title: 'vlanManagement'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VlanManagementRoutingModule {}