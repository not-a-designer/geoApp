import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgmMap } from '@agm/core';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;// = 43.0389;
  lng: number;// = 87.9065;
  @ViewChild(AgmMap) public map: AgmMap;
  constructor(public navCtrl: NavController, public geoLoc: Geolocation) {
    

  }

  ionViewDidLoad() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (this.geoLoc) {
      this.geoLoc.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.map.latitude = this.lat;
        this.map.longitude = this.lng;
        //this.lat = resp.coords.latitude;
        //this.lng = resp.coords.longitude;
        }).catch((error) => {
          console.log('Error getting location', error);
      });

    }

    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
      });
    }*/
  }

}
