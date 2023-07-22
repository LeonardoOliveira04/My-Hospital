import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MudarPasswordPageRoutingModule } from './mudar-password-routing.module';

import { MudarPasswordPage } from './mudar-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MudarPasswordPageRoutingModule
  ],
  declarations: [MudarPasswordPage]
})
export class MudarPasswordPageModule {}
