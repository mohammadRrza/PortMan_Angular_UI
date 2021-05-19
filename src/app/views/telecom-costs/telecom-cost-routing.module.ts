import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelecomCostsComponent } from './telecom-costs.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'telecom_costs'
    },
        
    children: [
      {
        path: '',
        redirectTo: 'telecom_costs'
      },
      {
        path: 'telecom_costs',
        component: TelecomCostsComponent,
        data: {
          title: 'telecom_costs'
        }
      }
  ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TelecomeCostRoutingModule {}