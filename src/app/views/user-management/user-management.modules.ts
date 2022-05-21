import { NgModule } from '@angular/core';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {FieldsetModule} from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
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
        UserManagementRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        PaginatorModule,
        FieldsetModule,
        ButtonModule,
        ConfirmDialogModule,
        TabsModule,
        TabViewModule,
        AutoCompleteModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        ToggleButtonModule,
        InputSwitchModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        PasswordModule,
        ProgressSpinnerModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: "#78C000",
            innerStrokeColor: "#C7E596",
            animationDuration: 300
            }),
    ],
    declarations: [ UserManagementComponent ]
  })
  export class UserManagementModule { }