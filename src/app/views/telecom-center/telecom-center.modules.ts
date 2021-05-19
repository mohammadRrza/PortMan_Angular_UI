import { NgModule } from '@angular/core';
import { TelecomCenterRoutingModule } from './telecom-center-routing.module';
import { TelecomCenterComponent } from './telecom-center.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from "@angular/common";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {TableModule} from 'primeng/table';
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

@NgModule({
    imports: [
        TelecomCenterRoutingModule,
        CommonModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        FormsModule,
        TableModule,
        PaginatorModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        AutoCompleteModule,
        TooltipModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        FieldsetModule,
        CardModule
    ],
    declarations: [ TelecomCenterComponent ]
  })
  export class TelecomCenterModule { }