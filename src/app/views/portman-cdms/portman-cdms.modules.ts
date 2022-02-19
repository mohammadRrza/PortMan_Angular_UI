import { NgModule } from '@angular/core';
import { PortmanCdmsComponent } from './portman-cdms.component';
import { PortmanCDMSRoutingModule } from './portman-cdms.routing.module';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {CardModule} from 'primeng/card';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
    imports: [
        PortmanCDMSRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        PaginatorModule,
        ProgressSpinnerModule,
        FieldsetModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        AutocompleteLibModule,
        CardModule,
        TooltipModule,
        DialogModule,
        InputSwitchModule,
        InputNumberModule
        ],
    declarations: [ PortmanCdmsComponent ]
  })
  export class PortmanCdmsModule { }