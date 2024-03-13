import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { TablaEmpleadosComponent } from './secciones/tablaEmpleados/tablaEmpleados.component';
import { DocumentosComponent } from './secciones/documentos/documentos.component';
import { GestionHorariosComponent } from './secciones/gestionHorarios/gestion-horarios/gestion-horarios.component';
import { EstatusTrabajoComponent } from './secciones/estatus-trabajo/estatus-trabajo.component';

const routes: Routes = [
  {path: '',
  component: EmpleadosComponent,
  children: [
    { path:'informacion', component:TablaEmpleadosComponent},
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