import { NgModule } from '@angular/core';
import { SwitchRoutingModule } from './switch-routing.module';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SwitchComponent } from "./switch.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { SwitchOperationComponent } from './switch-operation.component';

@NgModule({
  imports: [
    SwitchRoutingModule,
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
    ButtonModule,
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

  declarations: [SwitchComponent,
                 SwitchOperationComponent
                ]
})
export class SwitchModule { }