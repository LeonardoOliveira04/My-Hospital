import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriageQuestionairePageRoutingModule } from './triage-questionaire-routing.module';

import { TriageQuestionairePage } from './triage-questionaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriageQuestionairePageRoutingModule
  ],
  declarations: [TriageQuestionairePage]
})
export class TriageQuestionairePageModule {}
