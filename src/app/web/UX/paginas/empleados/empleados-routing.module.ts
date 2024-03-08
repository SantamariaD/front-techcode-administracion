import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { DocumentosComponent } from './secciones/documentos/documentos.component';
import { EstatusTrabajoComponent } from './secciones/estatus-trabajo/estatus-trabajo.component';
import { InformacionComponent } from './secciones/informacion/informacion.component';
import { GestionHorariosComponent } from './secciones/gestion-horarios/gestion-horarios.component';

const routes: Routes = [
  {path: '',
  component: EmpleadosComponent,
  children: [
    { path:'informacion', component:InformacionComponent},
    { path: 'documentos', component: DocumentosComponent },
    { path: 'horarios', component: GestionHorariosComponent },
    { path: 'estatus', component: EstatusTrabajoComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }