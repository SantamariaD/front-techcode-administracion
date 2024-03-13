import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs';
import { Area } from '../../../../../../informacion/interface/areas';
import {
  Empleados,
  EmpleadosStore,
} from '../../../../../../informacion/interface/empleados';
import {
  DataHorario,
  DiaSemana,
} from '../../../../../../informacion/interface/horarios';
import { HttpClientServiceInterface } from '../../../../../../informacion/interface/httpService';
import { Puesto } from '../../../../../../informacion/interface/puesto';
import { AreasService } from '../../../../../../informacion/servicios/areas/areas.service';
import { EmpleadosService } from '../../../../../../informacion/servicios/empleados/empleados.service';
import { HorariosGeneralesService } from '../../../../../../informacion/servicios/horarios-generales/horarios-generales.service';
import { HorariosService } from '../../../../../../informacion/servicios/horarios/horarios.service';
import { PuestosService } from '../../../../../../informacion/servicios/puestos/puestos.service';
import {
  selectAreasGuardadas,
  selectEmpleadosStore,
} from '../../../../../../informacion/state';
import { guardarAreas } from '../../../../../../informacion/state/areas/areas.actions';
import { guardarEmpleados } from '../../../../../../informacion/state/empleados/empleados.actions';
import { verificarPermisos } from '../../../../../../informacion/utils/funciones';

@Component({
  selector: 'app-gestion-horarios',
  templateUrl: './gestion-horarios.component.html',
  styleUrls: ['./gestion-horarios.component.scss'],
})
export class GestionHorariosComponent implements OnInit {
  @ViewChild('listaEmpleadosSelect', { static: false }) lista!: ElementRef;
  @ViewChild('calendarioSelect', { static: false }) calendar!: ElementRef;
  /**
   * @Input empleado: este input recibe el empleado seleccio0nado para editar
   */
  @Input() empleado: Empleados = {} as Empleados;

  /**
   * @viewChild areaSelect: trae el elemento select de areas para poder asignarle un valor por defecto.
   */
  @ViewChild('areaSelect') areaSelect: any;

  /**
   * @viewChild puestoSelect: trae el elemento select de puestos para poder asignarle un valor por defecto.
   */
  @ViewChild('puestoSelect') puestoSelect: any;

  /**
   * @vaiable sinDatos:Establece si hay un horario asignado o esta vacio.
   */
  sinDatos = false;

  /**
   * @variable empleados: Contiene el arreglo de todos los empleados existentes.
   */
  empleados: Empleados[] = [];

  /**
   * @variable areas: este arreglo contiene todas las areas de la empresa
   */
  areas: Area[] = [];

  /**
   * @variable areas: Almacena el objeto del area que mantiene el filtro
   */
  areaSeleccionada: Area = {} as Area;

  puestos: Puesto[] = [];

  /**
   * @variable puestoSeleccionado:almacena el arreglo de puestos que estan relacionado al area del filtro.
   */
  puestosConArea: Puesto[] = [];

  /**
   * @variable puestoSeleccionado:almacena el valor del puesto seleccionado en el filtro.
   */
  puestoSeleccionado: Puesto = {} as Puesto;

  /**
   * @variable listaEmpleados:Almacena el arreglo de empleados que genera el filtro.
   */
  listaEmpleados: Empleados[] = [];

  /**
   * @variable listaPuestos:Contiene el arreglo con todos los puestos existentes.
   */
  listaPuestos: Puesto[] = [];

  /**
   * @variable todos:Sirve para validar si se seleccionan todos los checkbox.
   */
  todos = false;

  /**
   * @variable listaSeleccionadosTemp:Almacena el valor del los checkbos seleccionados antes de que se agregan al tablero.
   */
  listaSeleccionados: Empleados[] = [];

  horasPorEmpleado: DataHorario[] = [];

  horariosEmpelados: DataHorario[] = [];

  /**
   * @variable listaTablero:Almacena el valor del los empleados que se muestran en el tablero para asignar horario.
   */
  listaTablero: Empleados[] = [];

  mostrarLista = false;

  slectTodos = false;

  weekDays: DiaSemana[] = [];

  fechas: DiaSemana[] = [];

  /**
   * @variable mostrarModal:Presenta u oculta el modal segun sea el caso
   */
  mostrarModal = false;

  /**
   * @variable fechaSeleccionada: la fecha que se selecciono para editar en el tablero.
   */
  fechaSeleccionada: DiaSemana = {} as DiaSemana;

  today: number = new Date().getDay();

  currentDate: Date = new Date();

  mostrarCalendario = false;

  respuesta = true;

  horarioRevisar: DataHorario = {} as DataHorario;

  nombreArea = '';

  nombrePuesto = '';

  mostrarSelectTodos = false;

  abrirFiltros = true;

  mostrarTablero = false;

  modalCrearHorario = false;

  horarios: DataHorario[] = [];

  jornadas: DataHorario[] = [];

  jornadaSinDescanso: DataHorario[] = [];

  listaHorarios = true;

  horarioGeneralSelect = {} as DataHorario;

  horarioSeleccionado = {} as DataHorario;

  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private horariosGeneralesService: HorariosGeneralesService,
    private horarioService: HorariosService,
    private empleadoServise: EmpleadosService,
    private areaService: AreasService,
    private puestoService: PuestosService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getWeekDays();
    this.traerTodasAreas();
    this.traerTodosEmpleados();
    this.traerTodosPuestos();
    this.traerHorariosGenerales();
    this.traerTodosHorarios();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.lista?.nativeElement.contains(event.target)) {
      this.mostrarLista = false;
    }
    if (!this.calendar?.nativeElement.contains(event.target)) {
      this.mostrarCalendario = false;
    }
  }

  permisosSistema(permisos: string[]): boolean {
    return verificarPermisos(permisos);
  }

  traerTodasAreas() {
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

  traerTodosPuestos() {
    this.puestoService.consultarPuestos().subscribe({
      next: (todosPuestos: HttpClientServiceInterface<Puesto[]>) => {
        this.puestos = todosPuestos.payload;
      },
      error: (error) => console.log(error),
    });
  }

  traerTodosEmpleados() {
    this.store
      .select(selectEmpleadosStore)
      .pipe(take(1))
      .subscribe((empleadosStore: EmpleadosStore) => {
        if (!empleadosStore?.empleados) {
          this.empleadoServise.traerTodosEmpleados().subscribe({
            next: (empleados: HttpClientServiceInterface<Array<Empleados>>) => {
              this.empleados = empleados.payload;
              this.empleados.forEach((element) => {
                element.nombreCompleto =
                  element.nombres +
                  ' ' +
                  element.apellido_materno +
                  ' ' +
                  element.apellido_paterno;
              });
              this.store.dispatch(
                guardarEmpleados({ empleados: empleados.payload })
              );
            },
            error: (error) => console.log(error),
          });
        } else {
          this.empleados = empleadosStore.empleados;
          this.empleados.forEach((element) => {
            element.nombreCompleto =
              element.nombres +
              ' ' +
              element.apellido_materno +
              ' ' +
              element.apellido_paterno;
          });
        }
      });
  }

  traerTodosHorarios(param?: number) {
    this.horarioService.traerHorarios().subscribe({
      next: (response: HttpClientServiceInterface<DataHorario[]>) => {
        this.horarios = response.payload;
        if (param) {
          this.agregarTablero(1);
        }
      },
    });
  }

  seleccionarArea(event: any) {
    this.mostrarLista = false;
    this.listaEmpleados = [];
    this.listaPuestos = [];
    this.puestoSelect.nativeElement.value = '0';
    const areaSeleccionada = event.target.value;
    this.areas.forEach((area) => {
      if (area.area === areaSeleccionada) {
        this.areaSeleccionada = area;
      }
    });
    if (areaSeleccionada === 'todos') {
      this.listaPuestos = this.puestos;
    } else {
      this.empleados.forEach((empleado) => {
        if (empleado.area_id === this.areaSeleccionada.id) {
          this.listaEmpleados.push(empleado);
        }
      });
      this.puestos.forEach((puesto) => {
        if (puesto.id_area === this.areaSeleccionada.id) {
          this.listaPuestos.push(puesto);
        }
      });
    }
  }

  seleccionarPuesto(event: any) {
    this.mostrarLista = false;
    this.listaEmpleados = [];
    const puestoSeleccionado = event.target.value;
    this.puestos.forEach((puesto) => {
      if (puestoSeleccionado === puesto.puesto) {
        this.puestoSeleccionado = puesto;
      }
    });
    if (puestoSeleccionado === 'todos' && !this.areaSeleccionada.id) {
      this.listaEmpleados = this.empleados;
    } else if (puestoSeleccionado === 'todos' && this.areaSeleccionada.id) {
      this.empleados.forEach((empleado) => {
        if (empleado.puesto_id === this.areaSeleccionada.id) {
          this.listaEmpleados.push(empleado);
        }
      });
    } else {
      this.empleados.forEach((empleado) => {
        if (empleado.puesto_id === this.puestoSeleccionado.id) {
          this.listaEmpleados.push(empleado);
        }
      });
    }
  }

  agregar() {
    this.slectTodos = false;
    this.todos = false;
    let lista: any = [];
    this.listaEmpleados.forEach((empleado) => {
      if (this.listaTablero.includes(empleado)) {
        lista.push(empleado);
      }
    });
    if (lista.length < this.listaEmpleados.length) {
      this.mostrarSelectTodos = true;
    } else {
      this.mostrarSelectTodos = false;
    }
    this.mostrarLista = !this.mostrarLista;
  }

  //Quita empleados del tablero
  retirar(empleado: Empleados) {
    const index = this.listaTablero.findIndex((x) => x.id === empleado.id);
    this.listaTablero.splice(index, 1);
    if (this.listaTablero.length < this.listaEmpleados.length) {
      this.mostrarSelectTodos = true;
    } else {
      this.mostrarSelectTodos = false;
    }
    if (this.listaTablero.length === 0) {
      this.mostrarTablero = false;
    }
  }

  cambioEstatusRadio(empleado: Empleados, evento: any) {
    this.listaSeleccionados.push(empleado);
    this.agregarTablero(2);
  }

  selcconTodos() {
    this.listaEmpleados.forEach((empleado) => {
      if (!this.listaTablero.includes(empleado)) {
        this.listaSeleccionados.push(empleado);
      }
    });
    this.listaEmpleados = [];
    this.agregarTablero(2);
  }

  getWeekDays() {
    this.weekDays = [];
    const today = this.currentDate.getDay();
    const startOfWeek = new Date(this.currentDate);
    const endOfWeek = new Date(this.currentDate);

    startOfWeek.setDate(this.currentDate.getDate() - this.today + 1);
    endOfWeek.setDate(this.currentDate.getDate() + (6 - this.today) + 1);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const fechaOriginal = new Date(day);
      const year = fechaOriginal.getFullYear();
      const month = String(fechaOriginal.getMonth() + 1).padStart(2, '0');
      const newday = String(fechaOriginal.getDate()).padStart(2, '0');
      const fechaFormateada = `${newday}-${month}-${year}`;

      this.weekDays.push({
        nombre: this.getDayName(day.getDay()),
        fecha: fechaFormateada,
      });
      this.fechas.push({
        nombre: this.getDayName(day.getDay()),
        fecha: fechaFormateada,
      });
    }
    this.agregarTablero(1);
  }

  getNextOrPreviousWeek(weeksToAdd: number) {
    const fechaSeccionada = this.weekDays[0].fecha.split('-');
    const fechaReves =
      +fechaSeccionada[2] + '/' + fechaSeccionada[1] + '/' + fechaSeccionada[0];
    this.fechas = [];
    this.weekDays = [];
    const diaVigente = new Date();
    const currentDate = new Date(fechaReves);
    const startOfWeek = new Date(currentDate);

    startOfWeek.setDate(currentDate.getDate() + weeksToAdd * 7);

    const newWeekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const fechaOriginal = new Date(day);
      const year = fechaOriginal.getFullYear();
      const month = String(fechaOriginal.getMonth() + 1).padStart(2, '0');
      const newday = String(fechaOriginal.getDate()).padStart(2, '0');
      const fechaFormateada = `${newday}-${month}-${year}`;

      if (diaVigente.getDay() === day.getDay()) {
        this.currentDate = day;
      }
      newWeekDays.push({
        nombre: this.getDayName(day.getDay()),
        fecha: fechaFormateada,
      });
      this.fechas.push({
        nombre: this.getDayName(day.getDay()),
        fecha: fechaFormateada,
      });
    }

    this.weekDays = newWeekDays;
    this.agregarTablero(1);
  }

  getDayName(day: number): string {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    return days[day];
  }

  agregarHorario() {
    this.sinDatos = false;
  }

  agregarTablero(identificador: number) {
    if (identificador === 1) {
      this.listaTablero.forEach((empleado) => {
        empleado.horaro = [];
      });
    } else {
      this.mostrarTablero = true;
      this.listaSeleccionados.forEach((select) => {
        if (!this.listaTablero.includes(select)) {
          this.listaTablero.push(select);
        }
      });

      this.listaPuestos = [];
      this.slectTodos = false;
      this.todos = false;
      this.puestoSelect.nativeElement.value = '0';
      this.areaSelect.nativeElement.value = '0';
    }

    this.listaTablero.forEach((empleado) => {
      const horasPorEmpleado: any = []; // Crear un array local para las horas del empleado actual

      if (this.horarios) {
        // Agregar todas las horas del empleado al array local
        this.horarios.forEach((horario) => {
          if (empleado.id === horario.idEmpleado) {
            horasPorEmpleado.push(horario);
          }
        });

        // Generar objetos para las fechas faltantes
        this.fechas.forEach((fecha) => {
          const fechaEncontrada = horasPorEmpleado.some(
            (data: DataHorario) => data.fecha === fecha.fecha
          );
          if (!fechaEncontrada) {
            horasPorEmpleado.push({
              idEmpleado: empleado.id,
              nombre: 'Agregar',
              fecha: fecha.fecha,
              hora_entrada: '0',
              hora_salida: '0',
              horas: '0',
            });
          }
        });

        // Asignar el array local al empleado actual
        empleado.horaro = horasPorEmpleado.map((day: DataHorario) => ({
          ...day,
        }));
      }
    });
    if (this.listaTablero.length < this.listaEmpleados.length) {
      this.mostrarSelectTodos = true;
    } else {
      this.mostrarSelectTodos = false;
    }
    this.listaSeleccionados = [];
  }

  AgregarHorario(fecha: any, empleado: Empleados, horario?: DataHorario) {
    if (this.permisosSistema(['empleadosHorariosM'])) {
      this.mostrarModal = true;
      this.horarioSeleccionado = horario!;
      this.fechaSeleccionada = fecha;
      this.empleado = empleado;
    } else {
      this.message.error(
        'Usted no tiene permisos para editar esta sección, hable con un administrador.'
      );
    }
  }

  cerrarModal(event: any) {
    if (event.actualizar) {
      this.mostrarModal = event.cerrarModal;
      this.message.success('Los horarios se han actualizado de manera correcta')
      this.traerTodosHorarios(1);
    } else {
      this.mostrarModal = false;
    }
  }

  onValueChange(value: Date): void {
    const diaVigente = new Date();
    const dias = 24 * (diaVigente.getDay() - 1);
    const unDiaEnMilisegundos = dias * 60 * 60 * 1000;
    const fechaSiguente = new Date(value.getTime() + unDiaEnMilisegundos);
    this.currentDate = fechaSiguente;
    this.getWeekDays();
  }

  modalCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  traerHorariosGenerales() {
    this.jornadas = [];
    this.jornadaSinDescanso = [];
    this.horariosGeneralesService.traerHorarios().subscribe((response) => {
      response.payload.forEach((jornada) => {
        if (jornada.baja !== 1) {
          this.jornadas.push(jornada);
        }
        if (jornada.nombre !== 'Descanso') {
          this.jornadaSinDescanso.push(jornada);
        }
      });
    });
  }

  MostrarHorarios(seccion: string) {
    if (seccion === 'horarios') {
      this.listaHorarios = true;
      this.abrirFiltros = true;
    } else {
      this.listaHorarios = false;
      this.abrirFiltros = false;
    }
  }

  revisarFiltros() {
    this.abrirFiltros = !this.abrirFiltros;
  }

  abrirModal(horario?: DataHorario) {
    this.modalCrearHorario = true;
    this.horarioGeneralSelect = horario!;
  }

  cerrarCrearHorario(event: any) {
    if (event === 1) {
      this.modalCrearHorario = false;
      this.traerHorariosGenerales();
    } else {
      this.modalCrearHorario = event;
    }
  }

  eliminarModal(horario: DataHorario) {
    this.modal.confirm({
      nzTitle:
        '<strong>¿Está seguro que desea borrar la jornada ' +
        horario.nombre +
        '?</strong>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminarJornada(horario),
    });
  }

  eliminarJornada(horario: DataHorario) {
    horario.baja = 1;
    this.horariosGeneralesService
      .actualizarHorario(horario)
      .subscribe((response) => {
        if (response.mensaje === 'Horario actualizado.') {
          this.message.create('success', `La Jornada se ha eliminado`);
          this.traerHorariosGenerales();
        }
      });
  }

  agregarEmpleado(id: number, dia: string) {
    //   this.fechas = [];
    //   this.horariosEmpelados.forEach(horario =>{
    //     if(horario.idEmpleado === id){
    //       this.fechas.push(horario.fecha);
    //     }
    //   });
    //     return this.fechas.includes(dia)
    // }
    // cicloAgregar(fecha:string){
    //  return this.fechas.includes(fecha)
  }
}
