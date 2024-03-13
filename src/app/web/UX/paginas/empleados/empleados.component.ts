import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { verificarPermisos } from '../../../informacion/utils/funciones';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {
  /**
   * @variable seccion: Contiene la seccione actual
   */
  seccion = 'Información';

  /**
   * @variable secciones: Contiene las secciones de empleados
   */
  secciones = [
    { texto: 'Información', seleccionado: true },
    { texto: 'Documentos', seleccionado: false },
    { texto: 'Horarios', seleccionado: false },
    { texto: 'Estatus de trabajo', seleccionado: false },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.seteoTabs();
  }

  /**
   * @Metodo cambia la sección de la cabecera
   */
  selectSeccion(cabecera: string) {
    this.seccion = cabecera;

    switch (true) {
      case cabecera === 'Información' &&
        verificarPermisos(['empleadosInformacionV', 'empleadosInformacionM']):
        this.router.navigate(['empleados/informacion']);
        break;
      case cabecera === 'Documentos' &&
        verificarPermisos(['empleadosDocumentosV', 'empleadosDocumentosM']):
        this.router.navigate(['empleados/documentos']);
        break;
      case cabecera === 'Horarios' &&
        verificarPermisos(['empleadosHorariosV', 'empleadosHorariosM']):
        this.router.navigate(['empleados/horarios']);
        break;
      case cabecera === 'Estatus de trabajo' &&
        verificarPermisos(['empleadosEstatusV', 'empleadosEstatusM']):
        this.router.navigate(['empleados/estatus']);
        break;
    }
  }

  /**
   * @Metodo Validar permisos para modulo
   */
  permisosSistema(permisos: string[]): boolean {
    return verificarPermisos(permisos);
  }

  /**
   * @Metodo Setea los tabs dependiendo la ruta
   */
  private seteoTabs(): void {
    let seccion = this.router.url.split('/')[2];

    switch (true) {
      case seccion == 'informacion' &&
        verificarPermisos(['empleadosInformacionV', 'empleadosInformacionM']):
        this.secciones = [
          { texto: 'Información', seleccionado: true },
          { texto: 'Documentos', seleccionado: false },
          { texto: 'Horarios', seleccionado: false },
          { texto: 'Estatus de trabajo', seleccionado: false },
        ];
        break;
      case seccion == 'documentos' &&
        verificarPermisos(['empleadosDocumentosV', 'empleadosDocumentosM']):
        this.secciones = [
          { texto: 'Información', seleccionado: false },
          { texto: 'Documentos', seleccionado: true },
          { texto: 'Horarios', seleccionado: false },
          { texto: 'Estatus de trabajo', seleccionado: false },
        ];
        break;
      case seccion == 'horarios' &&
        verificarPermisos(['empleadosHorariosV', 'empleadosHorariosM']):
        this.secciones = [
          { texto: 'Información', seleccionado: false },
          { texto: 'Documentos', seleccionado: false },
          { texto: 'Horarios', seleccionado: true },
          { texto: 'Estatus de trabajo', seleccionado: false },
        ];
        break;
      case seccion == 'estatus' &&
        verificarPermisos(['empleadosEstatusV', 'empleadosEstatusM']):
        this.secciones = [
          { texto: 'Información', seleccionado: false },
          { texto: 'Documentos', seleccionado: false },
          { texto: 'Horarios', seleccionado: false },
          { texto: 'Estatus de trabajo', seleccionado: true },
        ];
        break;
      default:
        if (
          verificarPermisos(['empleadosInformacionV', 'empleadosInformacionM'])
        ) {
          this.router.navigate(['/empleados/informacion']);
          this.secciones = [
            { texto: 'Información', seleccionado: true },
            { texto: 'Documentos', seleccionado: false },
            { texto: 'Horarios', seleccionado: false },
            { texto: 'Estatus de trabajo', seleccionado: false },
          ];
          break;
        }
        if (
          verificarPermisos(['empleadosDocumentosV', 'empleadosDocumentosM'])
        ) {
          this.router.navigate(['/empleados/documentos']);
          this.secciones = [
            { texto: 'Información', seleccionado: false },
            { texto: 'Documentos', seleccionado: true },
            { texto: 'Horarios', seleccionado: false },
            { texto: 'Estatus de trabajo', seleccionado: false },
          ];
          break;
        }
        if (verificarPermisos(['empleadosHorariosV', 'empleadosHorariosM'])) {
          this.router.navigate(['/empleados/horarios']);
          this.secciones = [
            { texto: 'Información', seleccionado: false },
            { texto: 'Documentos', seleccionado: false },
            { texto: 'Horarios', seleccionado: true },
            { texto: 'Estatus de trabajo', seleccionado: false },
          ];
          break;
        }
        if (verificarPermisos(['empleadosEstatusV', 'empleadosEstatusM'])) {
          this.router.navigate(['/empleados/estatus']);
          this.secciones = [
            { texto: 'Información', seleccionado: false },
            { texto: 'Documentos', seleccionado: false },
            { texto: 'Horarios', seleccionado: false },
            { texto: 'Estatus de trabajo', seleccionado: true },
          ];
          break;
        }
        break;
    }

    const seccionesAux = this.secciones;
    this.secciones = [];

    if (verificarPermisos(['empleadosInformacionV', 'empleadosInformacionM']))
      this.secciones.push(seccionesAux[0]);
    if (verificarPermisos(['empleadosDocumentosV', 'empleadosDocumentosM']))
      this.secciones.push(seccionesAux[1]);
    if (verificarPermisos(['empleadosHorariosV', 'empleadosHorariosM']))
      this.secciones.push(seccionesAux[2]);
    if (verificarPermisos(['empleadosEstatusV', 'empleadosEstatusM']))
      this.secciones.push(seccionesAux[3]);
  }
}
