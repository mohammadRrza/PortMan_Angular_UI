import { NgModule } from '@angular/core';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';


@NgModule({
    imports: [
        UserManagementRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        PaginatorModule
    ],
    declarations: [ UserManagementComponent ]
  })
  export class UserManagementModule { }