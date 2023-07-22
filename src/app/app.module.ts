import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//import { Geolocation } from '@ionic-native/geolocation/ngx';


export const firebaseConfig = {

  apiKey: "AIzaSyA_xalZl5Vp470vg0Nw-5_OkW7TydGRhKQ",

  authDomain: "ami-tp6-2.firebaseapp.com",

  projectId: "ami-tp6-2",

  storageBucket: "ami-tp6-2.appspot.com",

  messagingSenderId: "630551460897",

  appId: "1:630551460897:web:541e2888a8c49ede35b760",

  measurementId: "G-N6D866G6H4"

};

/*export const firebaseConfig = {

  apiKey: "AIzaSyCjlfaz-h7kGvWRjK9kVhMDj5iOfnAxfqc",

  authDomain: "tpfinal-ami.firebaseapp.com",

  projectId: "tpfinal-ami",

  storageBucket: "tpfinal-ami.appspot.com",

  messagingSenderId: "578185002565",

  appId: "1:578185002565:web:86a3fe6e1b821db79f2d2c",

  measurementId: "G-GXEL3D6XLF"

};*/




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, AngularFireDatabaseModule, AngularFireAuthModule, AngularFireStorageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: SETTINGS, useValue: {} }, Geolocation],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
