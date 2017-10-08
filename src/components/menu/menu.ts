import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

import { LocationService } from '../../app/location.service';


export class SearchObject {
  constructor(
    public crashTypes: boolean[],
    public days: boolean[],
    public address: string,
    public radius: string,
    public atIntersection: boolean,
    public weather?: string,
    public lighting?: string,
    public surface?: string) {}
}



@Component({
  selector: 'menu-component',
  templateUrl: './menu.html',
  //styleUrls : ['./menu.scss'],
  styles: [`
    ion-select { min-width: 100% !important; }
    ion-input { min-width: 100% !important; }
  `]
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

  public radiusOptions: string[] = [
    '2 Blocks',
    '1/2 mile',
    '1 mile',
    '2 miles'
  ];

  public weatherOptions: string[] = [
    'Clear',
    'Rain',
    'Fog/smoke/hazy',
    'Strong crosswind',
    'Sleet/hail',
    'Snow'
  ];

  public lightingOptions: string[] = [
    'Daylight',
    'Darkness',
    'Darkness w/ lit path',
    'Dawn',
    'Dusk'
  ];

  public surfaceOptions: string[] = [
    'Dry',
    'Wet',
    'Sand/mud/dirt',
    'Snow/slush',
    'Ice'
  ];
  
  public selectedQuery: SearchObject;

  reportsFound: number = 0;

  constructor(
    private mapsApiLoader: MapsAPILoader, 
    private ngZone: NgZone,
    private location: LocationService) {
    console.log('Hello MenuComponent Component');
    
  }

  ngOnInit() {
    let initCrashTypes: boolean[] = [];
    let initDays: boolean[] = [];
    for (let i = 0; i < this.daysInWeek.length; i++) {
      initDays.push(true);
    }
    for (let i = 0; i < this.crashTypes.length; i++) {
      initCrashTypes.push(true);
    }
    this.selectedQuery = new SearchObject(
      initCrashTypes,
      initDays,
      this.searchElement.nativeElement,
      this.radiusOptions[0],
      false,
      this.weatherOptions[0],
      this.lightingOptions[0],
      this.surfaceOptions[0]
    );
    
    this.mapsApiLoader.load().then( () => {
      let searchParam = document.body.getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(searchParam, { types: ['address'] });
        
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          } else {

            this.location.setPosition(place.geometry.location.lat(), place.geometry.location.lng());
            console.log('lat = ' + place.geometry.location.lat());
            console.log('lng = ' + place.geometry.location.lng());
          }
        });
      });
      

    });
  }


  keyUpEvent(ev: Event) {
    //this.selectedQuery.address !== '' ? console.log('addressQuery = ', this.selectedQuery.address) : console.log('no addressQuery');
  }

  reset(section: string) {
    let i: number = 0;
    switch(section) {
      case 'crash': {
        let crashes: boolean[] = [];
        for (i; i < this.crashTypes.length; i++) {
          crashes.push(false);
        }
        this.selectedQuery.crashTypes = crashes.slice();
        break;
      }

      case 'days': {
        let weekdays: boolean[] = [];
        for(i; i < this.daysInWeek.length; i++) {
          weekdays.push(false);
        }
        this.selectedQuery.days = weekdays.slice();
        break;
      }

      case 'find': {
        this.selectedQuery.address = '';
        this.selectedQuery.radius = this.radiusOptions[0];
        this.selectedQuery.atIntersection = false;
        break;
      }

      case 'environment': {
        this.selectedQuery.weather = this.weatherOptions[0];
        this.selectedQuery.lighting = this.lightingOptions[0];
        this.selectedQuery.surface = this.lightingOptions[0];
        break;
      }
    }
  }

  selectAll(section: string) {
    let i: number = 0;

    switch(section) {
      case 'crash': {
        let crashes: boolean[] = [];
        for (i; i < this.crashTypes.length; i++) {
          crashes.push(true);
        }
        this.selectedQuery.crashTypes = crashes.slice();
        break;
      }

      case 'days': {
        let weekdays: boolean[] = [];
        for (i; i < this.daysInWeek.length; i++) {
          weekdays.push(true);
        }
        this.selectedQuery.days = weekdays.slice();
        break;
      }
    }
  }

  resetAll() {
    this.selectAll('days');
    this.selectAll('crash');
    this.reset('find');
    this.reset('environment');
    this.location.resetPosition();
  }

  

}
