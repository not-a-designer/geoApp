import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'menu-component',
  templateUrl: 'menu.html'
})
export class MenuComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

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

  addressQuery: string = '';

  constructor(private mapsApiLoader: MapsAPILoader, private ngZone: NgZone) {
    console.log('Hello MenuComponent Component');
  }

  ngOnInit() {
    this.mapsApiLoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });
      
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
      

    });
  }

}
