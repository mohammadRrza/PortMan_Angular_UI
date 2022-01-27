import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePartakFqdnsComponent } from './update-partak-fqdns.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'partak'
    },
        
    children: [
      {
        path: 'update-partak-fqdns',
        redirectTo: 'update-partak-fqdns'
      },
      {
        path: 'update-partak-fqdns',
        component: UpdatePartakFqdnsComponent,
        data: {
          title: 'update-partak-fqdns'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UpdatePartakFqdnsRoutingModule {}