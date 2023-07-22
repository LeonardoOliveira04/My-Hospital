import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodasConsultasPageRoutingModule } from './todas-consultas-routing.module';

import { TodasConsultasPage } from './todas-consultas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodasConsultasPageRoutingModule
  ],
  declarations: [TodasConsultasPage]
})
export class TodasConsultasPageModule {}
