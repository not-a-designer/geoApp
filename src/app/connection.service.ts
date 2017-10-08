import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

declare const connection;

@Injectable()
export class ConnectionService {

    private onDevice: boolean;

    constructor(public platform: Platform, private network: Network) {
        this.onDevice = this.platform.is('cordova');
    }

    isOnline(): boolean {
        if (this.onDevice && this.network.type) {
            return this.network.type !== connection.NONE;
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice && this.network.type) {
            return this.network.type !== connection.NONE;
        } else {
            return !navigator.onLine;
        }
    }

    watchOnline(): Observable<any> {
        return this.network.onConnect();
    }

    watchOffline(): Observable<any> {
        return this.network.onDisconnect();
    }
}