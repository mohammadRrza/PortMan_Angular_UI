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
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


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
        MultiSelectModule,
        ButtonModule,
        ConfirmDialogModule,
        TabsModule,
        TabViewModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        ToggleButtonModule,
        InputSwitchModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        PasswordModule,
        NgCircleProgressModule,
        ProgressSpinnerModule,
        
    ],
    declarations: [ 
        UserPermissionComponent
     ]
  })
  export class UserPermissionModule { }