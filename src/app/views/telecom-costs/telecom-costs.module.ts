import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelecomeCostRoutingModule } from './telecom-cost-routing.module';
import { TelecomCostsComponent } from './telecom-costs.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  imports: [
    CommonModule,
    TelecomeCostRoutingModule,
    TableModule,
    PaginatorModule,
    DialogModule
  ],
  declarations: [TelecomCostsComponent]
})
export class TelecomCostsModule { }
