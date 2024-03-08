import { Component, OnInit } from '@angular/core';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [EmpleadosRoutingModule, ComponentesModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss',
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
    //this.seteoTabs();
  }

  /**
   * @Metodo cambia la sección de la cabecera
   */
  selectSeccion(cabecera: string) {
    this.seccion = cabecera;
    console.log(cabecera)
    switch (true) {
      case cabecera === 'Información':
        this.router.navigate(['empleados/informacion']);
        break;
      case cabecera === 'Documentos':
        this.router.navigate(['empleados/documentos']);
        break;
      case cabecera === 'Horarios':
        this.router.navigate(['empleados/horarios']);
        break;
      case cabecera === 'Estatus de trabajo':
        this.router.navigate(['empleados/estatus']);
        break;
    }
  }
}
