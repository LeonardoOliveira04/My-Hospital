import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudarPasswordPage } from './mudar-password.page';

const routes: Routes = [
  {
    path: '',
    component: MudarPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MudarPasswordPageRoutingModule {}
