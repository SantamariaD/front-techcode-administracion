import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Empleados } from '../../../../../informacion/interface/empleados';
import { formateoMoneda } from '../../../../../informacion/utils/funciones';

@Component({
  selector: 'app-informacion-card',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnInit {
  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Input() empleado: Empleados = {} as Empleados;

  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Output() idJefeInmediato = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
