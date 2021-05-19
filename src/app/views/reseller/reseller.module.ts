import { NgModule } from '@angular/core';
import { ResellerComponent } from './reseller.component';
import { ResellerRoutingModule } from './reseller-routing.module';
import {TableModule} from 'primeng/table';
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [
      ResellerRoutingModule,
      TableModule,
      CommonModule
    ],
    declarations: [ ResellerComponent
                  ]
    })
  export class ResellerModule { }