import { Routes } from '@angular/router';
import { HomeComponent } from './web/UX/paginas/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'suscripciones',
    loadComponent: () =>
      import('./web/UX/paginas/suscripciones/suscripciones.component').then(
        (m) => m.SuscripcionesComponent
      ),
  },
  {
    path: 'empleados',
    loadChildren: () =>
      import('./web/UX/paginas/empleados/empleados.module').then(
        (m) => m.EmpleadosModule
      ),
    //canActivate: [RutasGuard],
  },
];
