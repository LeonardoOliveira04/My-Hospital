import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodasConsultasPage } from './todas-consultas.page';

const routes: Routes = [
  {
    path: '',
    component: TodasConsultasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodasConsultasPageRoutingModule {}
