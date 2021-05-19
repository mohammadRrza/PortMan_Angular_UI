import { NgModule } from '@angular/core';
import { DslamPortRoutingModule } from './dslam-port-routing.module';
import { DslamPortComponent } from './dslam-port.component';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from "../../views/buttons/buttons.module";
import {NgxPaginationModule} from 'ngx-pagination';
import { DslamPortOperationComponent } from './dslamPort-operation.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule} from 'primeng/card';
import { HighchartsChartComponent } from 'highcharts-angular';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {ChartModule} from 'primeng/chart';

@NgModule({
    imports: [
        DslamPortRoutingModule,
        CommonModule,
        CardModule,
        BsDropdownModule.forRoot(),
        ButtonsModule,
        NgxPaginationModule,
        TableModule,
        DialogModule,
        ProgressSpinnerModule,
        AutoCompleteModule,
        TooltipModule,
        InputTextModule,
        PaginatorModule,
        ButtonModule,
        AutocompleteLibModule,
        TabsModule,
        FieldsetModule,
        DpDatePickerModule,
        ChartModule
    ],
    declarations: [ DslamPortComponent,DslamPortOperationComponent,HighchartsChartComponent]
  })
  export class DslamPortModule { }