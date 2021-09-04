import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'telecom-center',
        loadChildren: () => import('./views/telecom-center/telecom-center.modules').then(m => m.TelecomCenterModule)

      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'back_up_errors',
        loadChildren: () => import('./views/telecom-costs/telecom-costs.module').then(m => m.TelecomCostsModule)
      },
      {
        path: 'backup-management',
        loadChildren: () => import('./views/backup-management/backup-management.madules').then(m => m.BackupManagementModule)
      },
      {
        path: 'router',
        loadChildren: () => import('./views/router/router.modules').then(m => m.RoutersModule)
      },
      {
        path: 'switch',
        loadChildren: () => import('./views/switch/switch.modules').then(m => m.SwitchModule)
      },
      {
        path: 'radio',
        loadChildren: () => import('./views/radio/radio.madules').then(m => m.RadioModule)
      },
      {
        path: 'dslam',
        loadChildren: () => import('./views/dslam/dslam.modules').then(m => m.DslamModule)
      },
      {
        path: 'dslamport',
        loadChildren: () => import('./views/dslam-port/dslam-port.modules').then(m => m.DslamPortModule)
      },
      {
        path: 'userManagement',
        loadChildren: () => import('./views/user-management/user-management.modules').then(m => m.UserManagementModule)
      },
            
      {
        path: 'contact',
        loadChildren: () => import('./views/port-map/port-map.modules').then(m => m.PortMaphModule)
      },

      {
        path: 'reseller',
        loadChildren: () => import('./views/reseller/reseller.module').then(m => m.ResellerModule)
      },

      {
        path: 'permission',
        loadChildren: () => import('./views/user-permission/user-permissiont.modules').then(m => m.UserPermissionModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('./views/access-profile/access-profile.modules').then(m => m.AccessProfileModule)
      },
      {

        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
