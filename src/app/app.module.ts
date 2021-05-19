import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ToastrModule } from 'ngx-toastr';
import { GoogleMapsModule } from '@angular/google-maps'


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

//services
import { DslamService } from '../services/dslam.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service'
import { ErrorHandlerService } from '../services/error-handler.service';
import { WebsocketService } from '../services/websocket.service';
import { CityService } from '../services/city.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResellerService } from '../services/reseller.service';
import { ConfirmationService } from 'primeng/api';
import { PermissionService } from '../services/permission.service';
import { RouterService } from '../services/router.service';
import { SwitchService } from '../services/switch.service';
import { ContactService } from '../services/contact.service';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      enableHtml: true
    }),
    AppFooterModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    DslamService,
    ResellerService,
    HttpClientModule,
    UserService,
    RouterService,
    SwitchService,
    NotificationService,
    ErrorHandlerService,
    WebsocketService,
    CityService,
    ConfirmationService,
    PermissionService,
    ContactService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
