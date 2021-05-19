import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelecomeCostRoutingModule } from './telecom-cost-routing.module';
import { TelecomCostsComponent } from './telecom-costs.component';



@NgModule({
  imports: [
    CommonModule,
    TelecomeCostRoutingModule
  ],
  declarations: [TelecomCostsComponent]
})
export class TelecomCostsModule { }
