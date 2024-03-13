import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import { Area } from '../../../../../informacion/interface/areas';
import { Banco } from '../../../../../informacion/interface/bancos';
import { CatalogoBancos } from '../../../../../informacion/interface/catalogo-bancos';
import { Empleados } from '../../../../../informacion/interface/empleados';
import {
  EmpleadoRoles,
  Rol,
} from '../../../../../informacion/interface/empleados-roles';
import { HttpClientServiceInterface } from '../../../../../informacion/interface/httpService';
import { Puesto } from '../../../../../informacion/interface/puesto';
import { ConsultaSucursales } from '../../../../../informacion/interface/sucursales';
import { ColumnaTabla } from '../../../../../informacion/interface/tabla';
import { AreasService } from '../../../../../informacion/servicios/areas/areas.service';
import { CatalogoBancosService } from '../../../../../informacion/servicios/catalogo-bancos/catalogo-bancos.service';
import { EmpleadosRolesService } from '../../../../../informacion/servicios/empleados-roles/empleados-roles.service';
import { EmpleadosService } from '../../../../../informacion/servicios/empleados/empleados.service';
import { PuestosService } from '../../../../../informacion/servicios/puestos/puestos.service';
import { SucursalesService } from '../../../../../informacion/servicios/sucursales/sucursales.service';
import {
  selectAreasGuardadas,
  selectPuestosGuardados,
  selectSelectBancosStore,
  selectSucursalesStore,
} from '../../../../../informacion/state';
import { guardarAreas } from '../../../../../informacion/state/areas/areas.actions';
import { guardarBancos } from '../../../../../informacion/state/bancos/bancos.actions';
import {
  guardarEmpleadoSeleccionado,
  guardarEmpleados,
} from '../../../../../informacion/state/empleados/empleados.actions';
import { guardarPuestos } from '../../../../../informacion/state/puestos/puestos.actions';
import { guardarSucursales } from '../../../../../informacion/state/sucursales/sucursales.actions';
import { formateoMoneda, verificarPermisos } from '../../../../../informacion/utils/funciones';

@Component({
  selector: 'app-tablatablaEmpleados',
  templateUrl: './tablaEmpleados.component.html',
  styleUrls: ['./tablaEmpleados.component.scss'],
})
export class TablaEmpleadosComponent implements OnInit {
  /**
   * @Output documentos envia el string que cierra el modal y redirige a documentosEmpleado
   */
  @Output() documentos = new EventEmitter<any>();

  /**
   * @variable mostrarCardEmpleados: es un booleano para abrir y cerrar el modal de la card de empleados
   */
  mostrarCardEmpleado = false;

  /**
   * @variable empleado: trae el empleado seleccionado en la tabla
   */
  empleado: Empleados = {} as Empleados;

  /**
   * @variable despidos: trae los empleados despedidos en los ultimos tres meses
   */
  despidos: Empleados[] = [];

  /**
   * @variable despidos: trae los empleados contratados en los ultimos tres meses
   */
  contratados: Empleados[] = [];

  /**
   * @variable catalogoBancos: contiene las catalogoBancos
   */
  catalogoBancos: Array<CatalogoBancos> = [];

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados: Empleados[] = [];

  /**
   * @variable roles: trae el array de todos los roles
   */
  roles: Rol[] = [];

  /**
   * @variable empleadosRoles: tiene todos los reoles de todos los empleados
   */
  empleadosRoles: EmpleadoRoles[] = [];

  /**
   * @variable empleados: array de busqueda de empleados
   */
  empleadosFiltrados: Empleados[] = [];

  /**
   * @variable sucursales: trae el array de todos los sucursales
   */
  sucursales: ConsultaSucursales[] = [];

  /**
   *
   * @variable switchValue
   */
  switchValue = false;

  /**
   * @Variable isVisible: Esta variable contiene el valor para abrir o cerrar el modal de crear empleados
   */
  isVisible = false;

  /**
   * @Variable mostrarOpcionesEmpleado: Muestra las opciones de busqueda de empleados
   */
  mostrarOpcionesEmpleado = false;

  /**
   * @Variable mostrarEmpleadoInfo: Muestra la información del empleado buscado y encontrado
   */
  mostrarEmpleadoInfo = false;

  /**
   * @variable areaa: Todas las areas que existen.
   */
  areas: Area[] = [];

  /**
   * @variable puestos: Áreas de la empresa.
   */
  puestos: Puesto[] = [];

  /**
   * @variable columnasTabla: Columnas que contiene la tabla
   */
  columnasTabla: Array<ColumnaTabla> = [
    { columna: 'No. Empleado', llave: 'id', busqueda: true },
    { columna: 'Nombre', llave: 'nombreCompleto', busqueda: true },
    { columna: 'Departamento', llave: 'departamento', busqueda: true },
    { columna: 'Puesto', llave: 'puesto', busqueda: true },
    { columna: 'Teléfono', llave: 'telefono', busqueda: true },
  ];

  /**
   * @Formulario empleadoBVusquedaForm: Columnas que contiene la tabla
   */
  empleadoBusquedaForm = new FormControl('', [Validators.required]);

  constructor(
    private empleadoServise: EmpleadosService,
    private store: Store,
    private areaService: AreasService,
    private puestoService: PuestosService,
    private sucursalesService: SucursalesService,
    private message: NzMessageService,
    private catalogoBancosService: CatalogoBancosService,
    private empleadosRolesService: EmpleadosRolesService
  ) {}

  ngOnInit(): void {
    this.traerTodasAreas();
    this.traerTodosPuestos();
    this.consultarSucursales();
    this.traerTodosEmpleados();
    this.consultarCatalogoBancos();
    this.consultarEmpleadosRoles();
    this.consultarRoles();
  }

  /**
   * @Metodo para traer al empleado seleccionado en la fila
   */
  clickFila(empleado: Empleados) {
    this.empleado = empleado;
    this.store.dispatch(guardarEmpleadoSeleccionado({ empleado: empleado }));
    this.mostrarCardEmpleado = true;
    this.switchValue = empleado.baja
      ? (this.switchValue = true)
      : (this.switchValue = false);
  }

  /**
   * @Metodo cierra el modal de agregar empleado
   */
  clickCerrarModal(cerrar: any) {
    this.mostrarCardEmpleado = false;
  }

  /**
   * @Metodo cierra o abre el modal de empleado
   */
  abirCerrarModal(opcion: boolean): void {
    this.mostrarCardEmpleado = opcion;
  }

  /**
   * @Metodo actualiza la información del empleado en la base de datos
   */
  actualizarEmpleado(empleado: any) {
    this.empleadoServise.actualizarEmpleado(empleado).subscribe({
      next: (respuestaImagen: HttpClientServiceInterface<Empleados[]>) => {
        this.actualizarTablaEmpleados(respuestaImagen.payload);
        this.calculosEmpleados();
        this.mostrarCardEmpleado = false;
        this.message.success(`Se actualizó correctamente el empleado.`);
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo actualiza la información laboral del empleado en la base de datos
   */
  actualizarInformacionLaboral(empleado: Empleados): void {
    this.empleadoServise.actualizarEmpleadoLaboral(empleado).subscribe({
      next: (respuestaImagen: HttpClientServiceInterface<Empleados[]>) => {
        this.actualizarTablaEmpleados(respuestaImagen.payload);
        this.calculosEmpleados();
        this.mostrarCardEmpleado = false;
        this.message.success(`Se actualizó correctamente el empleado.`);
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo envia el evento Click en documentos
   */
  docEmpleado(docEmpleados: string) {
    this.documentos.emit(docEmpleados);
  }

  /**
   * @Metodo actualiza la tabla al crear un empleado
   */
  altaEmpleado(empleados: Empleados[]) {
    this.empleados = empleados;
    this.empleados.forEach((element) => {
      element.nombreCompleto =
        element.nombres +
        ' ' +
        element.apellido_materno +
        ' ' +
        element.apellido_paterno;
      this.areas.forEach((area) => {
        if (area.id === element.area_id) {
          element.departamento = area.area;
        }
      });
      this.puestos.forEach((puesto) => {
        if (puesto.id === element.puesto_id) {
          element.puesto = puesto.puesto;
        }
      });
    });
  }

  /**
   * @Metodo abre el modal para agregar empleado
   */
  agregarEmpleado() {
    this.isVisible = true;
  }

  /**
   * @Metodo Cierra el modal
   */
  cerrarModalCrear() {
    this.isVisible = false;
  }

  /**
   * @Metodo llama al servicio para actualizar la imagen del empleado
   */
  editarImagen(imagenEmpleado: any): void {
    this.empleadoServise.actualizarEmpleado(imagenEmpleado).subscribe({
      next: (respuestaImagen: HttpClientServiceInterface<Empleados[]>) => {
        this.actualizarTablaEmpleados(respuestaImagen.payload);
        this.calculosEmpleados();
        this.mostrarCardEmpleado = false;
        this.message.success(`Se actualizó correctamente la imagen.`);
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Autocompleta el input para buscar empleado
   */
  bucarEmpleado(): void {
    if (!this.empleadoBusquedaForm.value) {
      this.empleadosFiltrados = this.empleados;
      this.mostrarEmpleadoInfo = false;
    } else {
      this.empleadosFiltrados = this.empleados.filter((empleado: Empleados) => {
        const nombreBusqueda = this.empleadoBusquedaForm.value || '';
        const nombreCompleto =
          empleado.nombres +
          ' ' +
          empleado.apellido_paterno +
          ' ' +
          empleado.apellido_materno;

        return nombreCompleto
          .toLocaleLowerCase()
          .includes(nombreBusqueda.toLocaleLowerCase());
      });
    }

    this.mostrarOpcionesEmpleado = true;

    if (this.empleadosFiltrados.length < 1) {
      this.mostrarOpcionesEmpleado = false;
    }
  }

  /**
   * @Metodo Empleado seleccionado de la busqueda
   */
  selectOpcion(empleado: Empleados): void {
    const nombreCompleto =
      empleado.nombres +
      ' ' +
      empleado.apellido_paterno +
      ' ' +
      empleado.apellido_materno;

    this.empleadoBusquedaForm.setValue(nombreCompleto);
    this.mostrarOpcionesEmpleado = false;
    this.mostrarEmpleadoInfo = true;
  }

  /**
   * @Metodo Mostrar opciones de empleados
   */
  mostrarOpcionesEmpleadoBusqueda(mostrar: boolean): void {
    setTimeout(() => (this.mostrarOpcionesEmpleado = mostrar), 200);
  }

  /**
   * @Metodo Mostrar información del jefe inmediato
   */
  informacionJefeInmediato(id: number): void {
    this.mostrarCardEmpleado = false;
    this.empleado = this.empleados.filter(
      (empleadoTabla: Empleados) => empleadoTabla.id == id
    )[0];

    if (this.empleado) {
      if (this.empleado?.salario && typeof this.empleado.salario == 'number')
        this.empleado.salario = formateoMoneda(
          parseFloat(this.empleado.salario)
        );

      this.store.dispatch(
        guardarEmpleadoSeleccionado({ empleado: this.empleado })
      );

      this.switchValue = this.empleado?.baja
        ? (this.switchValue = true)
        : (this.switchValue = false);

      this.mostrarCardEmpleado = true;
    }
  }

  /**
   * @Metodo Guarda los roles asignados a un empleado
   */
  guardarEmpleadoRoles(empleadoRoles: any[]): void {
    this.empleadosRolesService
      .guardarEmpleadosRoles({ roles: empleadoRoles })
      .subscribe({
        next: (
          respuestaGuardar: HttpClientServiceInterface<EmpleadoRoles[]>
        ) => {
          this.empleadosRoles = respuestaGuardar.payload;
          this.mostrarCardEmpleado = false;
          this.message.success('Se asignaron correctamente los roles al empleado');
          this.traerTodosEmpleados()
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo Elimina los roles de un empleado
   */
  eliminarEmpleadoRoles(empleadoRoles: any[]): void {
    this.empleadosRolesService
      .eliminarEmpleadosRoles({ roles: empleadoRoles })
      .subscribe({
        next: (
          respuestaGuardar: HttpClientServiceInterface<EmpleadoRoles[]>
        ) => {
          this.empleadosRoles = respuestaGuardar.payload;
          this.mostrarCardEmpleado = false;
          this.message.success(
            'Se eliminaron correctamente los roles del empleado'
          );
          this.traerTodosEmpleados()
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo Validar permisos para modulo
   */
  permisosSistema(permisos: string[]): boolean {
    return verificarPermisos(permisos);
  }

  /**
   * @Metodo Este metodo calcula las altas bajas y faltas de los empleados
   */
  private calculosEmpleados() {
    this.contratados = [];
    this.despidos = [];
    const obtenerFecha: Date = new Date();
    const anioActual = obtenerFecha.getFullYear();
    const mesActual = obtenerFecha.getMonth() + 1;
    this.empleados.forEach((empleado) => {
      if (empleado.baja) {
        const fechaLong = empleado.fechaBaja
          ? empleado.fechaBaja.split('-')
          : '';
        const fechaAnio = parseInt(fechaLong[0]);
        const fechaMes = parseInt(fechaLong[1]);
        if (
          (anioActual === fechaAnio && mesActual === fechaMes) ||
          mesActual - 3 <= fechaMes
        ) {
          this.despidos.push(empleado);
        }
      } else {
        if (empleado.fecha_reingreso !== null) {
          const fechaLong = empleado.fecha_reingreso
            ? empleado.fecha_reingreso.split('-')
            : '';
          const fechaAnio = parseInt(fechaLong[0]);
          const fechaMes = parseInt(fechaLong[1]);
          if (
            (anioActual === fechaAnio && mesActual === fechaMes) ||
            mesActual - 3 <= fechaMes
          ) {
            this.contratados.push(empleado);
          }
        } else {
          const fechaLong = empleado.fechaAlta.split('-');
          const fechaAnio = parseInt(fechaLong[0]);
          const fechaMes = parseInt(fechaLong[1]);
          if (
            (anioActual === fechaAnio && mesActual === fechaMes) ||
            mesActual - 3 <= fechaMes
          ) {
            this.contratados.push(empleado);
          }
        }
      }
    });
  }

  /**
   * @Metodo para traer todos los empleados
   */
  private traerTodosEmpleados() {
    this.empleadoServise.traerTodosEmpleados().subscribe({
      next: (empleados: HttpClientServiceInterface<Array<Empleados>>) => {
        this.actualizarTablaEmpleados(empleados.payload);
        this.calculosEmpleados();
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo consulta todos las áreas que hay
   */
  private traerTodasAreas() {
    this.store
      .select(selectAreasGuardadas)
      .pipe(take(1))
      .subscribe((areas: Area[]) => {
        if (areas.length <= 0) {
          this.areaService.consultarAreas().subscribe({
            next: (todasAreas: HttpClientServiceInterface<Area[]>) => {
              this.areas = todasAreas.payload;
              this.store.dispatch(guardarAreas({ areas: todasAreas.payload }));
            },
            error: (error) => console.log(error),
          });
        } else {
          this.areas = areas;
        }
      });
  }

  /**
   * @Metodo consulta todos los puestos que hay
   */
  private traerTodosPuestos() {
    this.store
      .select(selectPuestosGuardados)
      .pipe(take(1))
      .subscribe((puestos: Puesto[]) => {
        if (puestos.length <= 0) {
          this.puestoService.consultarPuestos().subscribe({
            next: (todosPuestos: HttpClientServiceInterface<Puesto[]>) => {
              this.puestos = todosPuestos.payload;
              this.store.dispatch(
                guardarPuestos({ puestos: todosPuestos.payload })
              );
            },
            error: (error) => console.log(error),
          });
        } else {
          this.puestos = puestos;
        }
      });
  }

  /**
   * @Metodo consulta las sucursales
   */
  private consultarSucursales() {
    this.store
      .select(selectSucursalesStore)
      .pipe(take(1))
      .subscribe((sucursalesStore: ConsultaSucursales[]) => {
        if (sucursalesStore.length <= 0) {
          this.sucursalesService.consultarSucursales().subscribe({
            next: (
              sucursalesConsulta: HttpClientServiceInterface<
                ConsultaSucursales[]
              >
            ) => {
              this.sucursales = sucursalesConsulta.payload;
              this.store.dispatch(
                guardarSucursales({ sucursales: sucursalesConsulta.payload })
              );
            },
            error: (error) => console.log(error),
          });
        } else {
          this.sucursales = sucursalesStore;
        }
      });
  }

  /**
   * @Metodo calcula los empleado para mostrar información
   */
  private actualizarTablaEmpleados(empleados: Empleados[]): void {
    this.empleados = empleados;
    this.empleadosFiltrados = empleados;
    this.empleados.forEach((element) => {
      element.nombreCompleto =
        element.nombres +
        ' ' +
        element.apellido_paterno +
        ' ' +
        element.apellido_materno;
      this.areas.forEach((area) => {
        if (area.id === element.area_id) {
          element.departamento = area.area;
        }
      });
      this.puestos.forEach((puesto) => {
        if (puesto.id === element.puesto_id) {
          element.puesto = puesto.puesto;
        }
      });
    });
    this.store.dispatch(guardarEmpleados({ empleados }));
  }

  /**
   * @Metodo consulta las sucursales
   */
  private consultarCatalogoBancos() {
    this.store
      .select(selectSelectBancosStore)
      .pipe(take(1))
      .subscribe((respuestaStore: Banco[]) => {
        if (respuestaStore.length < 1) {
          this.catalogoBancosService.consultarCatalogoBancos().subscribe({
            next: (
              respuestaBancos: HttpClientServiceInterface<CatalogoBancos[]>
            ) => {
              this.catalogoBancos = respuestaBancos.payload;
              this.store.dispatch(
                guardarBancos({ bancos: respuestaBancos.payload })
              );
            },
          });
        } else {
          this.catalogoBancos = respuestaStore;
        }
      });
  }

  /**
   * @Metodo Llena el formulario de editar
   */
  private consultarRoles(): void {
    this.empleadosRolesService.consultarRoles().subscribe({
      next: (respuestaConsulta: HttpClientServiceInterface<Rol[]>) =>
        (this.roles = respuestaConsulta.payload),
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Llena el formulario de editar
   */
  private consultarEmpleadosRoles(): void {
    this.empleadosRolesService.consultarEmpleadosRoles().subscribe({
      next: (respuestaConsulta: HttpClientServiceInterface<EmpleadoRoles[]>) =>
        (this.empleadosRoles = respuestaConsulta.payload),
      error: (error) => console.log(error),
    });
  }
}
