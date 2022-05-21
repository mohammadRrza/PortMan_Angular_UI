import { NgModule } from '@angular/core';
import { ResellerComponent } from './reseller.component';
import { ResellerRoutingModule } from './reseller-routing.module';
import {TableModule} from 'primeng/table';
import { CommonModule } from "@angular/common";
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    imports: [
      ResellerRoutingModule,
      TableModule,
      CommonModule,
      FieldsetModule,PaginatorModule,
      ButtonModule,
      ConfirmDialogModule,
      TabsModule,
      TabViewModule,
      AutoCompleteModule,
      DialogModule,
      FormsModule,
      ReactiveFormsModule,
      AutocompleteLibModule,
      ToggleButtonModule,
      InputSwitchModule,
      InputTextModule,
      InputNumberModule,
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
    declarations: [ ResellerComponent
                  ]
    })
  export class ResellerModule { }