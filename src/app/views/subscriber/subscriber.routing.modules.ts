import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriberComponent } from './subscriber.component';
// import { PersonalInformatin } from './personal-information';

const routes: Routes = [
    {
      path: '',
      component: SubscriberComponent,
      data: {
        title: 'subscriber'
      },
      // children: [
      //   {
      //     path: 'personal_information',
      //     component: PersonalInformatin,
      //     data: {
      //       title: 'personal_information'
      //     }
      //   },
      // ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SubscriberRoutingModule {}