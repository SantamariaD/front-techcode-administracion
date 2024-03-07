import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-suscripciones',
  standalone: true,
  imports: [],
  templateUrl: './card-suscripciones.component.html',
  styleUrl: './card-suscripciones.component.scss'
})
export class CardSuscripcionesComponent {
  /**
   * @Input suscripcion seleccionada de la tabla
   */
  @Input() suscripcion: any = {};

  /**
   * @Output clickCerrar: manda el evento al dar click sobre el icono X
   */
  @Output() clickCerrar = new EventEmitter<any>();

}
