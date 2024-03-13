import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../../componentes/componentes.module';
import { DocumentosComponent } from './secciones/documentos/documentos.component';
import { TablaEmpleadosComponent } from './secciones/tablaEmpleados/tablaEmpleados.component';
import { ModalEditarComponent } from './componentes/modal-editar/modal-editar.component';
import { CardEmpleadosComponent } from './componentes/card-empleados/card-empleados.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GestionHorariosComponent } from './secciones/gestionHorarios/gestion-horarios/gestion-horarios.component';
import { ModalAgregarComponent } from './secciones/gestionHorarios/gestion-horarios/componentes/modal-agregar/modal-agregar/modal-agregar.component';
import { CrearDocumentosComponent } from './componentes/crear-documentos/crear-documentos.component';
import { EstatusTrabajoComponent } from './secciones/estatus-trabajo/estatus-trabajo.component';
import { CardReporteComponent } from './componentes/card-reporte/card-reporte.component';

import { EliminarComponent } from './componentes/eliminar/eliminar.component';
import { CrearHorarioComponent } from './secciones/gestionHorarios/gestion-horarios/componentes/modal-agregar/modal-agregar/crear-horario/crear-horario.component';

import { EditarDocumentosComponent } from './componentes/editar-documentos/editar-documentos.component';
import { SharedModule } from '../../../informacion/utils/shared.module';
import { ModalCrearComponent } from './componentes/modal-crear/modal-crear.component';
import { PipesModule } from "../../../informacion/pipes/pipes.module";
import { DirectivasModule } from '../../../informacion/directivas/directivas.module';

@NgModule({
    declarations: [
        EmpleadosComponent,
        DocumentosComponent,
        TablaEmpleadosComponent,
        ModalEditarComponent,
        ModalCrearComponent,
        CardEmpleadosComponent,
        InformacionComponent,
        GestionHorariosComponent,
        ModalAgregarComponent,
        CrearDocumentosComponent,
        EstatusTrabajoComponent,
        CardReporteComponent,
        EliminarComponent,
        CrearHorarioComponent,
        EditarDocumentosComponent,
    ],
    exports: [
        EmpleadosComponent,
        DocumentosComponent,
        TablaEmpleadosComponent,
        ModalEditarComponent,
        ModalCrearComponent,
        CardEmpleadosComponent,
        InformacionComponent,
        GestionHorariosComponent,
        ModalAgregarComponent,
        CrearDocumentosComponent,
        EstatusTrabajoComponent,
        CardReporteComponent,
        EliminarComponent,
        DirectivasModule
    ],
    imports: [
        CommonModule,
        EmpleadosRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentesModule,
        NzToolTipModule,
        PipesModule
    ]
})
export class EmpleadosModule {}
