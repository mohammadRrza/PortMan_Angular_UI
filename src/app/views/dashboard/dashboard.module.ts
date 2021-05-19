import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TooltipModule} from 'primeng/tooltip';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule} from 'primeng/card';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps'
import {TableModule} from 'primeng/table';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ChartModule} from 'primeng/chart';


@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    TableModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    TabsModule,
    TableModule,
    ChartsModule,
    DialogModule,
    AutocompleteLibModule,
    FieldsetModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    TooltipModule,
    CardModule,
    AutoCompleteModule,
    GoogleMapsModule,
    ChartModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
