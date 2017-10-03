import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { MapsAPILoader } from '@agm/core';
//import {} from '@types/googlemaps';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  //@ViewChild('search') public searchElement: ElementRef;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

    crashTypes: string[] = [
    'Property damage',
    'Possible injury',
    'Non-incapacitating injury',
    'Incapacitating injury',
    'Fatality'
  ];

  daysInWeek: string[] = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thur',
    'Fri',
    'Sat'
  ];

  radiusOptions: string[] = [
    '2 Blocks',
    '1/2 mile',
    '1 mile',
    '2 miles'
  ];

  weatherOptions: string[] = [
    'Clear',
    'Rain',
    'Fog/smoke/hazy',
    'Strong crosswind',
    'Sleet/hail',
    'Snow'
  ];

  lightingOptions: string[] = [
    'Daylight',
    'Darkness',
    'Darkness w/ lit path',
    'Dawn',
    'Dusk'
  ];

  surfaceOptions: string[] = [
    'Dry',
    'Wet',
    'Sand/mud/dirt',
    'Snow/slush',
    'Ice'
  ];

  reportsFound: number = 0;

  addressQuery: string = null;
  

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    //public geoLoc: Geolocation,
    //private mapsApiLoader: MapsAPILoader, 
    //private ngZone: NgZone
    ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /*this.geoLoc.getCurrentPosition().then((resp) => {
        console.log(resp.coords);
      });*/

      /*this.mapsApiLoader.load().then( () => {
        let searchParam = <HTMLInputElement>document.getElementById('search');
        let autocomplete = new google.maps.places.Autocomplete(searchParam, { types: ['address'] });
        
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            console.log('Lat = ' + place.geometry.location.lat);
            console.log('Lng = ' + place.geometry.location.lng);
          });
        });
      });*/
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

    keyUpEvent(ev: Event) {
    console.log('addressQuery = ' + this.addressQuery);
  }
}
