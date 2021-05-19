import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortMapComponent } from './port-map.component';


const routes: Routes = [
    {
      path: '',
      data: {
        title: 'contact'
      },
          
      children: [
        {
          path: '',
          redirectTo: 'port-map'
        },
        {
          path: 'port-map',
          component: PortMapComponent,
          data: {
            title: 'port-map'
          }
        }
    ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PortMapRoutingModule {}