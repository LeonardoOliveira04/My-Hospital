import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeslotPageRoutingModule } from './timeslot-routing.module';

import { TimeslotPage } from './timeslot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeslotPageRoutingModule
  ],
  declarations: [TimeslotPage]
})
export class TimeslotPageModule {}
