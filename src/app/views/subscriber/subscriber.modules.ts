import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {SubscriberRoutingModule} from './subscriber.routing.modules'
import { SubscriberComponent } from './subscriber.component';
// import { PersonalInformatin } from './personal-information';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FieldsetModule } from 'primeng/fieldset';
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
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import { ToastModule } from 'primeng/toast';


@NgModule({
    imports: [
        CommonModule,
        SubscriberRoutingModule,
        TableModule,
        PaginatorModule,
        FieldsetModule,
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
        StepsModule,
        CardModule,
        ToastModule,
        ],
    declarations: [SubscriberComponent]
  })
  export class SubscriberModule { }