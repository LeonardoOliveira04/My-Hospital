import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRCodePageRoutingModule } from './qrcode-routing.module';

import { QRCodePage } from './qrcode.page';
import { QrCodeModule } from 'ng-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodePageRoutingModule,
    QrCodeModule
  ],
  declarations: [QRCodePage],
})
export class QRCodePageModule {}
