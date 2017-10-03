import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgmMap } from '@agm/core';

import { LocationService } from '../../app/location.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;
  lng: number;

  @ViewChild(AgmMap) public map: AgmMap;

  constructor(
    public navCtrl: NavController,
    public location: LocationService) {
    

  }

  ionViewDidLoad() {
    this.lat = 43.0389;
    this.lng = 87.9065;
    this.location.newLocation.subscribe(
      (coordArray) => {
        console.log('coordArray promise = ' + coordArray);
        this.lat = coordArray[0];
        this.lng = coordArray[1];

      }
    );
  }

  getCurrentLocation() {
    this.lat = this.location.getLat();
    this.lng = this.location.getLng();
    console.log('currentLat = ' + this.location.getLat());
    console.log('current lng = ' + this.location.getLng());
    this.location.setPosition(this.lat, this.lng);
  }

}
