import { NgModule } from '@angular/core';
import { UserPermissionRoutingModule } from './user-permission-routing.module';
import { UserPermissionComponent } from './user-permission.component';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {FieldsetModule} from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
    imports: [
        UserPermissionRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        TooltipModule,
        PaginatorModule,
        FieldsetModule,
        DialogModule,
        MultiSelectModule
        
    ],
    declarations: [ 
        UserPermissionComponent
     ]
  })
  export class UserPermissionModule { }