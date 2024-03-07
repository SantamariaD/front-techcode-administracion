import { Component, OnInit } from '@angular/core';
import { rutasSuscripciones } from './suscripciones-routes.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { ColumnaTabla } from '../../../informacion/interfaces/tabla';
import { CardSuscripcionesComponent } from './componentes/card-suscripciones/card-suscripciones.component';

@Component({
  selector: 'app-suscripciones',
  standalone: true,
  imports: [rutasSuscripciones, ComponentesModule, CardSuscripcionesComponent],
  templateUrl: './suscripciones.component.html',
  styleUrl: './suscripciones.component.scss',
})
export class SuscripcionesComponent implements OnInit {
  /**
   * @variable Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'ID Suscripción', llave: 'id', busqueda: true },
    {
      columna: 'Nombre del Suscriptor',
      llave: 'usuario',
      busqueda: true,
    },
    { columna: 'Fecha de registro', llave: 'created_at', busqueda: true },
    {
      columna: 'Estatus de la Suscripción',
      llave: 'estatus',
      busqueda: true,
    },
  ];

  /**
   * @variable Sucriptores del sistema
   */
  suscriptores: any[] = [
    {
      id: 'aassjkl',
      usuario: 'juanM',
      correo: 'diego@hotmail.com',
      tipoSuscripcion: 'premium',
      created_at: '12-02-2024 20:00:00',
      estatus: 'activa',
    },
    {
      id: 'gvnjad',
      usuario: 'Rub',
      correo: 'ruben@hotmail.com',
      tipoSuscripcion: 'premium',
      created_at: '12-02-2024 20:00:00',
      estatus: 'activa',
    }
  ];

  /**
   * @variable muestra la card de suscripciones
   */
  mostrarCardSuscripcion = false;

  /**
   * @variable muestra la card de suscripciones
   */
  suscripcion: any = {};

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo click en la tabla para una suscripcion
   */
  clickFilaSuscripcion(suscripcion: any): void {
    console.log(suscripcion);
    this.mostrarCardSuscripcion = true
    this.suscripcion = suscripcion;
  }
}
