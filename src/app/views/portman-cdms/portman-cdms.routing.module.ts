import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortmanCdmsComponent } from './portman-cdms.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'portman-cdms'
      },
          
      children: [
        {
          path: '',
          redirectTo: 'portman-cdms'
        },
        {
          path: 'portman-cdms',
          component: PortmanCdmsComponent,
          data: {
            title: 'portman-cdms'
          }
        },
    ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PortmanCDMSRoutingModule {}