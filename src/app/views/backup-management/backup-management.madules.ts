import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupManagementRoutingModule } from './backup-management-routing.module';
import { BackupManagementComponent } from './backup-management.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  imports: [
    CommonModule,
    BackupManagementRoutingModule,
    TableModule,
    PaginatorModule,
    DialogModule
  ],
  declarations: [BackupManagementComponent]
})
export class BackupManagementModule { }
