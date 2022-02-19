import { NgModule } from '@angular/core';
import { PishgamanNoteComponent, Safe } from './pishgaman-note.component';
import { PishgamanNoteRoutingModule } from './pishgaman-note.routing.module';
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
import {EditorModule} from 'primeng/editor';
import {JalaliPipe} from './pishgaman-note.component'

@NgModule({
    imports: [
        PishgamanNoteRoutingModule,
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
        EditorModule
    ],
    declarations: [ PishgamanNoteComponent,Safe,
        JalaliPipe ]
  })
  export class PishgamanNoteModule { }