import { RouterModule, Routes } from '@angular/router';
import { SuscripcionesComponent } from './suscripciones.component';
import { NgModule } from '@angular/core';

export const rutas: Routes = [
  { path: '', component: SuscripcionesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class rutasSuscripciones {}
