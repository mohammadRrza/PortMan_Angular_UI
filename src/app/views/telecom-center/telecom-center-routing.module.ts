import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelecomCenterComponent } from './telecom-center.component';

const routes: Routes = [
    {
      path: 'telecom-center',
      component: TelecomCenterComponent,
      data: {
        title: 'telecom-center'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TelecomCenterRoutingModule {}