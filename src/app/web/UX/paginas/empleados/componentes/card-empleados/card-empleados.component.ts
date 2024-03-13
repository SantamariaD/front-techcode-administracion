import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Area } from '../../../../../informacion/interface/areas';
import { CatalogoBancos } from '../../../../../informacion/interface/catalogo-bancos';
import { Empleados } from '../../../../../informacion/interface/empleados';
import {
  EmpleadoRoles,
  Rol,
} from '../../../../../informacion/interface/empleados-roles';
import { Puesto } from '../../../../../informacion/interface/puesto';
import { ConsultaSucursales } from '../../../../../informacion/interface/sucursales';
import { verificarPermisos } from '../../../../../informacion/utils/funciones';

@Component({
  selector: 'app-card-empleados',
  templateUrl: './card-empleados.component.html',
  styleUrls: ['./card-empleados.component.scss'],
})
export class CardEmpleadosComponent implements OnInit, OnDestroy {
  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Input() empleado: Empleados = {} as Empleados;

  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Input() empleados: Empleados[] = [];

  /**
   * @Input areas: contiene la info del areas seleccionado
   */
  @Input() areas: Area[] = [];

  /**
   * @Input puestos: contiene la info del puestos seleccionado
   */
  @Input() puestos: Puesto[] = [];

  /**
   * @Input sucursales: contiene la info las sucursales
   */
  @Input() sucursales: ConsultaSucursales[] = [];

  /**
   * @Input mostrarCardEmpleados: recibe un booleano para abrir y cerrar el modal de la card de empleados
   */
  @Input() mostrarCardEmpleado = false;

  /**
   * @Input empleadosRoles: tiene todos los reoles de todos los empleados
   */
  @Input() empleadosRoles: EmpleadoRoles[] = [];

  /**
   * @Input roles: trae el array de todos los roles
   */
  @Input() roles: Rol[] = [];

  /**
   *
   * @variable switchValue
   */
  @Input() switchValue = false;

  /**
   * @Input catalogoBancos: contiene las catalogoBancos
   */
  @Input() catalogoBancos: Array<CatalogoBancos> = [];

  /**
   * @Output clickCerrar envia el booleano que cierra el modal a la pantalla principal
   */
  @Output() clickCerrar = new EventEmitter<any>();

  /**
   * @Output editarEmpleado: envía el formulariop para editar el empleado
   */
  @Output() editarEmpleado = new EventEmitter<Empleados>();

  /**
   * @Output editarEmpleado: este output envia un true que indica
   * que se actualizo la información laboral de epmleado y actualizar la vista.
   */
  @Output() editarEmpleadoLaboral = new EventEmitter<Empleados>();

  /**
   * @Output docEmpleado envia el string que cierra el modal y redirige a documentosEmpleado
   */
  @Output() docEmpleado = new EventEmitter<string>();

  /**
   * @Output abirCerrarModal
   */
  @Output() abirCerrarModal = new EventEmitter<boolean>();

  /**
   * @Output editarImagen: este output envia el evento cuando se actualiza la imagen del empleado
   */
  @Output() editarImagen = new EventEmitter<FormData>();

  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Output() idJefeInmediato = new EventEmitter<number>();

  /**
   * @Output array con los roles a asignar del empleado.
   */
  @Output() guardarEmpleadoRoles = new EventEmitter<any[]>();

  /**
   * @Output array con los roles a liminar del empleado.
   */
  @Output() eliminarEmpleadoRoles = new EventEmitter<any[]>();

  /**
   * @Variable seccionModal: contiene la seccion de la card que se mostrara en pantalla
   */
  seccionModal = 'informacion';

  /**
   * @Variable tituloEliminar: tituloEliminar para dar de baja empleado
   */
  tituloEliminar = '';

  constructor(private modal: NzModalService, private router: Router) {}

  ngOnInit(): void {
    this.switchValue = !this.empleado.baja;
  }

  ngOnDestroy() {
    this.empleado = {} as Empleados;
  }

  //Metodo para cerrar el modal de la card
  clickCerrarModal() {
    this.clickCerrar.emit(false);
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickInformacion() {
    this.seccionModal = 'informacion';
    this.switchValue = !this.empleado.baja;
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickAgregar() {
    this.seccionModal = 'agregar';
  }

  //Metodo que cambia el valor de la seccion para que se muestre la de información.
  clickEditar() {
    this.seccionModal = 'editar';
    this.switchValue = !this.empleado.baja;
  }

  //Metodo que cambia el valor de la seccion para que se muestre dar de baja empleado.
  clickEliminar() {
    this.seccionModal = 'eliminar';
    this.tituloEliminar =
      this.switchValue == true
        ? '¿Está seguro que deseas dar de baja al empleado '
        : '¿Está seguro que deseas dar de alta nuevamente al empleado ';
  }

  // Modal de confirmación para dar de baja o dar de alta a un empleado
  modalBajaAlta(): void {
    this.seccionModal = 'eliminar';
    this.actualizarEmpleado();
  }

  //Metodo que manda la actualización del empleado a la vista para que se muestre
  ActualizaDatos(empleado: any) {
    this.editarEmpleado.emit(empleado);
  }

  //Metodo que manda la actualización de la imagen del empleado
  actualizarImagen(empleado: FormData) {
    this.editarImagen.emit(empleado);
  }

  //Este metodo actualiza los datos del empleado cuando se da de alta o baja
  actualizarEmpleado() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    const fechaFormateada = `${año}-${mes}-${dia}`;
    let dataActualizacion: Empleados = {} as Empleados;
    if (this.switchValue !== true) {
      dataActualizacion = {
        ...dataActualizacion,
        id_user: this.empleado.id_user,
        fechaBaja: fechaFormateada,
        baja: true,
        id: this.empleado.id,
      };
    } else {
      dataActualizacion = {
        ...dataActualizacion,
        fecha_reingreso: fechaFormateada,
        fechaAlta: fechaFormateada,
        baja: false,
        id: this.empleado.id,
        id_user: this.empleado.id_user,
      };
    }
    this.editarEmpleado.emit(dataActualizacion);
  }

  //este metodo envia el string para ambio de pantalla a documentos y el objeto del empleado
  verDocumentos(pantalla: string) {
    this.docEmpleado.emit(pantalla);
    this.router.navigate(['empleados/documentos']);
  }

  /**
   * @Metodo muestra la información del feje inmediato
   */
  informacionJefeInmediato(id: number): void {
    this.idJefeInmediato.emit(id);
  }

  /**
   * @Metodo Validar permisos para modulo
   */
  permisosSistema(permisos: string[]): boolean {
    return verificarPermisos(permisos);
  }
}
