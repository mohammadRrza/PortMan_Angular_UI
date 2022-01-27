import { NgModule } from '@angular/core';
import { UpdatePartakFqdnsRoutingModule } from './update-partak-fqdns-routing.module';
import { UpdatePartakFqdnsComponent } from './update-partak-fqdns.component';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {FieldsetModule} from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        UpdatePartakFqdnsRoutingModule,
        CommonModule,
        NgxPaginationModule,
        TableModule,
        TooltipModule,
        PaginatorModule,
        FieldsetModule,
        DialogModule,
        MultiSelectModule,
        AutocompleteLibModule,
        AutoCompleteModule,
        ButtonModule
        
    ],
    declarations: [ 
        UpdatePartakFqdnsComponent
     ]
  })
  export class UpdatePartakFqdnsModule { }