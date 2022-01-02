import { NgModule } from '@angular/core';
import { DslamRoutingModule } from './dslam-routing.module';
import { DslamComponent } from './dslam.component';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DslamOperationComponent } from "./dslam-operation.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ChartJSComponent } from '../chartjs/chartjs.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TooltipModule} from 'primeng/tooltip';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [
        DslamRoutingModule,
        ConfirmDialogModule,
        TableModule,
        CommonModule,
        BsDropdownModule.forRoot(),
        NgxPaginationModule,
        ReactiveFormsModule,
        TabsModule,
        FormsModule,
        PaginatorModule,
        ChartsModule,
        DialogModule,
        AutocompleteLibModule,
        FieldsetModule,
        InputSwitchModule,
        ProgressSpinnerModule,
        InputTextModule,
        TooltipModule,
        CardModule,
        AutoCompleteModule,
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

    declarations: [ DslamComponent,
                    DslamOperationComponent,
                    ChartJSComponent
                  ]
    })
  export class DslamModule { }