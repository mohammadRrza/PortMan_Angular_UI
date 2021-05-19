import { NgModule } from '@angular/core';
import { AccessProfileComponent } from './access-profile.component';
import { AccessProfileRoutingModule } from './access-profile-routing.module';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {FieldsetModule} from 'primeng/fieldset';

@NgModule({
    imports: [
        AccessProfileRoutingModule,
        CommonModule,
        NgxPaginationModule,
        PaginatorModule,
        TableModule,
        TooltipModule,
        FieldsetModule
    ],
    declarations: [ 
        AccessProfileComponent,

     ]
  })
  export class AccessProfileModule { }