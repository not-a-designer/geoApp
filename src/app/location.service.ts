import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const DEFAULT_LAT: number = 43.0389;
const DEFAULT_LNG: number = -87.9065;


@Injectable()
export class LocationService {


    private currentLat = DEFAULT_LAT;
    private currentLng = DEFAULT_LNG;

    public newLocation = new BehaviorSubject<number[]>([this.currentLat, this.currentLng]);

    setPosition(lat: number, lng: number) {
        this.currentLat = lat;
        this.currentLng = lng
        this.newLocation.next( [this.currentLat, this.currentLng] );
    }

    resetPosition() {
        this.currentLat = DEFAULT_LAT;
        this.currentLng = DEFAULT_LNG;
        this.newLocation.next( [this.currentLat, this.currentLng] );
    }


    getLat() {
        return this.currentLat;
    }


    getLng() {
        return this.currentLng;
    }
}