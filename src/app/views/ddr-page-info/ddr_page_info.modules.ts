import { NgModule } from '@angular/core';
import { DdrPageInfoComponent } from './ddr-page-info.component';
import { DDRPageInfoRoutingModule } from './ddr_page_info.routing.module';
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


@NgModule({
    imports: [
        DDRPageInfoRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        PaginatorModule,
        FieldsetModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        AutocompleteLibModule,
        CardModule
    ],
    declarations: [ DdrPageInfoComponent ]
  })
  export class DDRPageInfoModule { }