import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PishgamanNoteComponent } from './pishgaman-note.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'pishgaman-note'
      },
          
      children: [
        {
          path: '',
          redirectTo: 'pishgaman-note'
        },
        {
          path: 'pishgaman-note',
          component: PishgamanNoteComponent,
          data: {
            title: 'pishgaman-note'
          }
        },
    ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PishgamanNoteRoutingModule {}