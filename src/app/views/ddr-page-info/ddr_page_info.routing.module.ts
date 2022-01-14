import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DdrPageInfoComponent } from './ddr-page-info.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'ddr-page'
      },
          
      children: [
        {
          path: '',
          redirectTo: 'ddr-page-info'
        },
        {
          path: 'ddr-page-info',
          component: DdrPageInfoComponent,
          data: {
            title: 'ddr-page-info'
          }
        },
    ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DDRPageInfoRoutingModule {}