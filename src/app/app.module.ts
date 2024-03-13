import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './web/informacion/state';

registerLocaleData(es);

@NgModule({
  declarations: [],
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25
    , connectInZone: true}),
  ],
  bootstrap: [],
})
export class AppModule {}
