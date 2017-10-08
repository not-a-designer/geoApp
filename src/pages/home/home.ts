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
    this.location.newLocation.subscribe(
      (coordArray) => {
        console.log('coordArray promise = ' + coordArray);
        this.lat = coordArray[0];
        this.lng = coordArray[1];

      }
    );

    /*this.map.mapReady.subscribe(
      (map) => {
        let fusionLayer = new google.maps.FusionTablesLayer({
          query: {
            select: 'GOECODABLE_ADDRESS',
            from: '11Et646mw-jUfWPIqvNp8sinw6CDlNK0g1nlYcHtk',
            where: 'CONDITIONAL_CLAUSE'
          },
          styles: [{
            where: 'column_name_condition',
            markerOptions: 'supported_icon_name',
          }, {
            where: 'column_name_condition_2',
            markerOptions: 'supported_icon_name'
          }]
        });

        fusionLayer.setMap(map);
      }
    );*/
  }

  getCurrentLocation() {
    this.lat = this.location.getLat();
    this.lng = this.location.getLng();
    console.log('currentLat = ' + this.location.getLat());
    console.log('current lng = ' + this.location.getLng());
    this.location.setPosition(this.lat, this.lng);
  }

}
