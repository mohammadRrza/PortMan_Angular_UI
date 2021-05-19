import { NgModule } from '@angular/core';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
    imports: [
        UserManagementRoutingModule,
        CommonModule,
        NgxPaginationModule
    ],
    declarations: [ UserManagementComponent ]
  })
  export class UserManagementModule { }