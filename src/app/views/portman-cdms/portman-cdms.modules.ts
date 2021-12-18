import { NgModule } from '@angular/core';
import { PortmanCdmsComponent } from './portman-cdms.component';
import { PortmanCDMSRoutingModule } from './portman-cdms.routing.module';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {FieldsetModule} from 'primeng/fieldset';


@NgModule({
    imports: [
        PortmanCDMSRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        PaginatorModule,
        FieldsetModule
    ],
    declarations: [ PortmanCdmsComponent ]
  })
  export class PortmanCdmsModule { }