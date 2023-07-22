import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeslotPage } from './timeslot.page';

const routes: Routes = [
  {
    path: '',
    component: TimeslotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeslotPageRoutingModule {}
