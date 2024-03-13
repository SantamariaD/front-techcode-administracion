import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Empleados } from '../../../../../informacion/interface/empleados';

@Component({
  selector: 'app-eliminar-empleados',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {
  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Input() empleado: Empleados = {} as Empleados;

  /**
   * @Input tituloEliminar: tituloEliminar para dar de baja empleado
   */
  @Input() tituloEliminar = '';

  /**
   * @Output actualizarProducto: emite el evento de actualizar producto
   */
  @Output() eliminarProductoEmit = new EventEmitter<Empleados>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * @Metodo elimina el producto
   */
  clickEliminar(): void {
    this.eliminarProductoEmit.emit(this.empleado);
  }
}
