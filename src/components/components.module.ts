import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

import { MenuComponent } from './menu/menu';
import { googleMapParams } from '../app/app.module';


@NgModule({
	declarations: [
    MenuComponent
	],
	imports: [
		IonicModule,
		AgmCoreModule.forRoot(googleMapParams)
	],
	exports: [
    MenuComponent
	]
})
export class ComponentsModule {}
