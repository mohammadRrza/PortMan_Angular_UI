import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {VlanManagementRoutingModule} from './vlan-management.routing.modules'
import { VlanManagementComponent } from './vlan-management.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DropdownModule} from 'primeng/dropdown';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    imports: [
        CommonModule,
        VlanManagementRoutingModule,
        TableModule,
        PaginatorModule,
        FieldsetModule,
        ButtonModule,
        ConfirmDialogModule,
        TabsModule,
        TabViewModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        DialogModule,
        FormsModule,
        AutocompleteLibModule,
        ToggleButtonModule,
        DropdownModule,
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
    declarations: [VlanManagementComponent]
  })
  export class VlanManagementModule { }