import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';

import { LocationService } from './location.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ComponentsModule } from '../components/components.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


export const firebaseConfig = {
  apiKey: 'AIzaSyD_YEyzvXA6UmDM7trmNlzkOHGTB18-cOY',
  authDomain: 'geo-app-d43b6.firebaseapp.com',
  databaseURL: 'https://geo-app-d43b6.firebaseio.com',
  projectId: 'geo-app-d43b6',
  storageBucket: '',
  messagingSenderId: '256606025259'
};
export const googleMapParams = {
  apiKey: 'AIzaSyDTdTiXqX3Vsb34aOOdIClPu7F_lSH8x6Q',
  libraries: ['places'],
  language: 'en',
  region: 'us'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    AgmCoreModule.forRoot(googleMapParams),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
