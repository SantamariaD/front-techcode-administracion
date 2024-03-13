import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empleados } from '../../../../../../../../../informacion/interface/empleados';
import {
  DataHorario,
  DiaSemana,
} from '../../../../../../../../../informacion/interface/horarios';
import { HorariosService } from '../../../../../../../../../informacion/servicios/horarios/horarios.service';
import { Store } from '@ngrx/store';
import {
  CalendarioActualizar,
  CalendarioGuardar,
  CalendarioRespuesta,
} from '../../../../../../../../../informacion/interface/calendario';
import { CalendarioService } from '../../../../../../../../../informacion/servicios/calendario/calendario.service';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from '../../../../../../../../../informacion/interface/httpService';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modal-agregar',
  templateUrl: './modal-agregar.component.html',
  styleUrls: ['./modal-agregar.component.scss'],
  providers: [DatePipe],
})
export class ModalAgregarComponent implements OnInit {
  @Input() jornadaSinDescanso: DataHorario[] = [];

  @Input() inicioSemana = '';

  @Input() horarioSeleccionado: DataHorario = {} as DataHorario;
  /**
   * @Input mostrarModal: Trae la respuesta de la tabla de empleados para abrir el modal de crear
   */
  @Input() mostrarModal = false;

  /**
   * @Input mostrarModal: Trae la respuesta de la tabla de empleados para abrir el modal de crear
   */
  @Input() empleado: Empleados = {} as Empleados;

  /**
   * @input fechaSeleccionada:Fecha que se pasa para su modificación.
   */
  @Input() fechaSeleccionada: DiaSemana = {} as DiaSemana;

  @Input() horariosGenericos: DataHorario[] = [];

  /**
   * @var horarios:Contiene todos los horarios del empleado.
   */
  horarios: DataHorario[] = [];

  /**
   * @Output cerrarModal: envia el boleano para cerrar el modal de crear empleados
   */
  @Output() cerrarModal = new EventEmitter<any>();

  /**
   * @Form formHorario: contiene los datops que requiere el horario para ser guardado.
   */
  formHorario: FormGroup = new FormGroup({
    id: new FormControl(0),
    idHorGeneral: new FormControl(0, [Validators.required]),
    idEmpleado: new FormControl(0, [Validators.required]),
    fecha: new FormControl(Date, [Validators.required]),
    repeticion: new FormControl(null, [Validators.required]),
  });

  weekDays: DiaSemana[] = [];

  dias: any = [
    { subfijo: 'Lunes' },
    { subfijo: 'Martes' },
    { subfijo: 'Miercoles' },
    { subfijo: 'Jueves' },
    { subfijo: 'Viernes' },
    { subfijo: 'Sabado' },
    { subfijo: 'Domingo' },
  ];

  listaSeleccionados: DiaSemana[] = [];

  diasDescanso: DiaSemana[] = [];

  diasDescSelect: DiaSemana[] = [];

  hours: string[] = [];

  switchValue = false;

  dataHorario: DataHorario = {} as DataHorario;

  diasCiclo: DiaSemana[] = [];

  @Input() currentDate: Date = new Date();

  horarioGralSeleccionado: DataHorario = {} as DataHorario;

  contCalendario = '';

  idCalendario = 0;

  listaCalendario!: any;

  anioBusquedaCalendario = '';

  jornada: DataHorario[] = [];

  constructor(
    private datePipe: DatePipe,
    private horarioService: HorariosService,
    private store: Store,
    private calendarioService: CalendarioService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.traerHorario();
    this.getWeekDays();
    this.listaSeleccionados = [];
    if (this.horarioSeleccionado.idHorGeneral) {
      this.formHorario.patchValue({
        idHorGeneral: this.horarioSeleccionado.idHorGeneral,
      });
      this.seleccionaHorario();
    }
    // console.log(this.horarioGralSeleccionado);
    console.log(this.horarioSeleccionado);
    this.formHorario.patchValue({
      fecha: this.fechaSeleccionada.fecha,
    });

    this.traerEventosCalendario();
  }

  traerEventosCalendario() {
    this.calendarioService
      .traerCalendarioid(this.empleado.id_user.toString())
      .subscribe({
        next: (response: HttpClientServiceInterface<any>) => {
          this.listaCalendario = response.payload;
          console.log(response);
        },
      });
  }

  traerHorario() {
    this.horarioService
      .traeHorarioById(this.empleado.id)
      .subscribe((response) => {
        this.horarios = response.payload;
        console.log(this.horarios);
      });
  }

  cerrar(valor?: number) {
    if (valor) {
      const data = {
        cerrarModal: false,
        actualizar: true,
      };
      this.cerrarModal.emit(data);
      this.mostrarModal = false;
    } else {
      this.cerrarModal.emit(false);
      this.mostrarModal = false;
    }
  }

  Seleccionado(dia: any, accion: string) {
    if (accion === 'agregar') {
      this.listaSeleccionados.push(dia);
    } else {
      const index = this.listaSeleccionados.findIndex(
        (x: any) => x.nombre === dia.nombre
      );
      this.listaSeleccionados.splice(index, 1);
    }
    console.log(this.listaSeleccionados);
  }

  seleccionadoDescanso(dia: DiaSemana, accion: string) {
    if (accion === 'agregar') {
      this.diasDescSelect.push(dia);
    } else {
      const index = this.diasDescSelect.findIndex(
        (x: any) => x.nombre === dia.nombre
      );
      this.diasDescSelect.splice(index, 1);
    }
    console.log(this.diasDescSelect);
  }

  getWeekDays() {
    this.weekDays = [];
    const fechaSeccionada = this.inicioSemana.split('-');
    const fechaReves =
      +fechaSeccionada[2] + '/' + fechaSeccionada[1] + '/' + fechaSeccionada[0];
    const currentDate = new Date(fechaReves);
    const today = new Date().getDay();
    console.log(today);
    const startOfWeek = new Date();

    startOfWeek.setDate(currentDate.getDate());

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
    }
    console.log(this.weekDays);
  }

  getNextOrPreviousWeek(weeksToAdd: number) {
    const fechaSeccionada = this.weekDays[0].fecha.split('-');
    const fechaReves =
      +fechaSeccionada[2] + '/' + fechaSeccionada[1] + '/' + fechaSeccionada[0];
    console.log(fechaReves);
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
    }

    this.weekDays = newWeekDays;
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

  async guardarHorario() {
    let guardadoIndividual = false;
    let actualizaLaborales: any[] = [];
    let guardaLaborales: any[] = [];
    let guardarEventos: any[] = [];
    let actualizaEventos: any[] = [];
    let actualizaDescansos: any[] = [];
    let guardaDescansos: any[] = [];
    this.cicloRepeticionDias(this.formHorario.value.repeticion);
    this.formHorario.removeControl('repeticion');
    if (!this.switchValue) {
      this.formHorario.patchValue({
        fecha: this.fechaSeleccionada.fecha,
        idEmpleado: this.empleado.id,
      });
      if (this.horarios.length > 0) {
        const existeFechaEnDataHorario = this.horarios.some(
          (item) => item.fecha === this.fechaSeleccionada.fecha
        );
        if (existeFechaEnDataHorario) {
          this.horarios.forEach((horario) => {
            if (horario.fecha === this.fechaSeleccionada.fecha) {
              console.log(horario);
              this.formHorario.patchValue({ id: horario.id });
              this.horarioService
                .actualizarHorario(this.formHorario.value)
                .subscribe((response) => {
                  guardadoIndividual = true;
                });
              actualizaEventos.push(
                this.traerCalendarioId(
                  this.fechaSeleccionada.fecha,
                  parseInt(this.formHorario.value.idHorGeneral)
                )
              );
            }
          });
        } else {
          this.formHorario.removeControl('id');
          this.horarioService
            .guardarHorario(this.formHorario.value)
            .subscribe((response) => {
              guardadoIndividual = true;
            });
          guardarEventos.push(
            this.guardarCalendario(
              this.fechaSeleccionada.fecha,
              parseInt(this.formHorario.value.idHorGeneral)
            )
          );
        }
      } else {
        this.formHorario.removeControl('id');
        this.horarioService
          .guardarHorario(this.formHorario.value)
          .subscribe((response) => {
            guardadoIndividual = true;

            console.log(response);
          });
        guardarEventos.push(
          this.guardarCalendario(
            this.fechaSeleccionada.fecha,
            parseInt(this.formHorario.value.idHorGeneral)
          )
        );
      }
    } else {
      console.log(this.horarios);
      this.formHorario.patchValue({ idEmpleado: this.empleado.id });
      let id = 0;
      for (const dia of this.diasCiclo) {
        for (const seleccionado of this.listaSeleccionados) {
          if (dia.nombre === seleccionado.nombre) {
            if (this.horarios.length > 0) {
              const existeFechaEnDataHorario = this.horarios.some(
                (item) => item.fecha === dia.fecha
              );
              if (existeFechaEnDataHorario) {
                this.horarios.forEach((horario) => {
                  if (horario.fecha === dia.fecha) {
                    this.formHorario.addControl('id', new FormControl(0));
                    this.formHorario.patchValue({
                      fecha: dia.fecha,
                      id: horario.id,
                    });
                    actualizaLaborales.push(this.formHorario.value);
                    actualizaEventos.push(
                      this.traerCalendarioId(
                        dia.fecha,
                        parseInt(this.formHorario.value.idHorGeneral)
                      )
                    );
                  }
                });
              } else {
                this.formHorario.removeControl('id');
                this.formHorario.patchValue({ fecha: dia.fecha });
                guardaLaborales.push(this.formHorario.value);
                guardarEventos.push(
                  this.guardarCalendario(
                    dia.fecha,
                    parseInt(this.formHorario.value.idHorGeneral)
                  )
                );
              }
            } else {
              this.formHorario.removeControl('id');
              this.formHorario.patchValue({ fecha: dia.fecha });
              guardaLaborales.push(this.formHorario.value);
              guardarEventos.push(
                this.guardarCalendario(
                  dia.fecha,
                  parseInt(this.formHorario.value.idHorGeneral)
                )
              );
            }
          }
        }
      }
      for (const dia of this.diasCiclo) {
        for (const descanso of this.diasDescSelect) {
          if (dia.nombre === descanso.nombre) {
            if (this.horarios.length > 1) {
              const existeFechaEnDataHorario = this.horarios.some(
                (item) => item.fecha === dia.fecha
              );
              if (existeFechaEnDataHorario) {
                this.horarios.forEach((horario) => {
                  if (horario.fecha === dia.fecha) {
                    this.formHorario.addControl('id', new FormControl(0));
                    this.formHorario.patchValue({
                      id: horario.id,
                      idempleado: this.empleado.id,
                      idHorGeneral: 1,
                      fecha: dia.fecha,
                    });
                  }
                });
                actualizaDescansos.push(this.formHorario.value);
                actualizaEventos.push(
                  this.traerCalendarioId(
                    dia.fecha,
                    parseInt(this.formHorario.value.idHorGeneral)
                  )
                );
              } else {
                this.formHorario.removeControl('id');
                this.formHorario.patchValue({
                  idempleado: this.empleado.id,
                  idHorGeneral: 1,
                  fecha: dia.fecha,
                });
                guardaDescansos.push(this.formHorario.value);
                guardarEventos.push(
                  this.guardarCalendario(
                    dia.fecha,
                    parseInt(this.formHorario.value.idHorGeneral)
                  )
                );
              }
            } else {
              this.formHorario.patchValue({
                idempleado: this.empleado.id,
                idHorGeneral: 1,
                fecha: dia.fecha,
              });
              guardaDescansos.push(this.formHorario.value);
              guardarEventos.push(
                this.guardarCalendario(
                  dia.fecha,
                  parseInt(this.formHorario.value.idHorGeneral)
                )
              );
            }
          }
        }
      }
    }
    const responseServices = await this.realizarTodasLasPeticiones(
      actualizaLaborales,
      guardaLaborales,
      actualizaDescansos,
      guardaDescansos,
      guardarEventos,
      actualizaEventos
    );
    if (responseServices || guardadoIndividual) {
      this.cerrar(1);
    } else {
      console.log('error al gaurdar');
    }
    this.switchValue = false;
  }

  async realizarTodasLasPeticiones(
    actualizaLaborales: any,
    guardaLaborales: any,
    actualizaDescansos: any,
    guardaDescansos: any,
    guardarEventos: any,
    actualizaEventos: any
  ): Promise<boolean> {
    try {
      const promesas: Promise<any>[] = [];

      if (actualizaLaborales.length > 0) {
        const promesaActualizaLaborales = new Promise((resolve, reject) => {
          this.horarioService
            .actualizarVariosHorarios({ horarios: actualizaLaborales })
            .subscribe({
              next: (response: HttpClientServiceInterface<DataHorario[]>) => {
                resolve(response);
              },
              error: (error: any) => {
                reject(error);
              },
            });
        });
        promesas.push(promesaActualizaLaborales);
      }
      if (guardaLaborales.length > 0) {
        const promesaguardaLaborales = new Promise((resolve, reject) => {
          this.horarioService
            .guardarVariosHorario({ horarios: guardaLaborales })
            .subscribe({
              next: (response: HttpClientServiceInterface<DataHorario[]>) => {
                resolve(response);
              },
              error: (error: any) => {
                reject;
              },
            });
        });
        promesas.push(promesaguardaLaborales);
      }
      if (actualizaDescansos.length > 0) {
        const promesaactualizaDescansos = new Promise((resolve, reject) => {
          this.horarioService
            .actualizarVariosHorarios({ horarios: actualizaDescansos })
            .subscribe({
              next: (response: HttpClientServiceInterface<DataHorario[]>) => {
                resolve(response);
              },
              error: (error: any) => {
                reject(error);
              },
            });
        });
        promesas.push(promesaactualizaDescansos);
      }
      if (guardaDescansos.length > 0) {
        const promesaguardaDescansos = new Promise((resolve, reject) => {
          this.horarioService
            .guardarVariosHorario({ horarios: guardaDescansos })
            .subscribe({
              next: (response: HttpClientServiceInterface<DataHorario[]>) => {
                resolve(response);
              },
              error: (error: any) => {
                reject(error);
              },
            });
        });
        promesas.push(promesaguardaDescansos);
      }
      if (guardarEventos.length > 0) {
        const promesaguardarEventos = new Promise((resolve, reject) => {
          this.calendarioService
            .crearVariosEventos({ eventos: guardarEventos })
            .subscribe({
              next: (
                response: HttpClientServiceInterface<CalendarioRespuesta>
              ) => {
                resolve(response);
              },
              error: (error: any) => {
                reject(error);
              },
            });
        });
        promesas.push(promesaguardarEventos);
      }
      if (actualizaEventos.length > 0) {
        const promesaguardarEventos = new Promise((resolve, reject) => {
          this.calendarioService
            .editarVariosEventos({ eventos: actualizaEventos })
            .subscribe({
              next: (
                response: HttpClientServiceInterface<CalendarioRespuesta>
              ) => {
                resolve(response);
              },
              error: (error: any) => {
                reject(error);
              },
            });
        });
      }

      // Repite el mismo patrón para las otras llamadas...

      // Espera a que todas las promesas se resuelvan
      await Promise.all(promesas);
      console.log(promesas);
      return true;
    } catch (error: any) {
      console.error('Error al realizar las peticiones:', error);
      // En caso de algún error, devuelve false
      return false;
    }
  }

  seleccionaHorario() {
    this.horariosGenericos.forEach((horario) => {
      if (horario.id === parseInt(this.formHorario.value.idHorGeneral)) {
        this.horarioGralSeleccionado = horario;
        console.log(this.horarioGralSeleccionado);
      }
    });
  }

  revisarSwitch() {
    this.horarioGralSeleccionado = {} as DataHorario;
    this.formHorario.patchValue({
      idHorGeneral: 0,
    });
  }

  cicloRepeticionDias(tiempo: number) {
    for (let i = 0; i < tiempo; i++) {
      this.weekDays.forEach((dia) => {
        this.diasCiclo.push(dia);
      });
      this.getNextOrPreviousWeek(1);
    }

    console.log(this.diasCiclo);
  }

  guardarCalendario(fecha: string, id: number) {
    const data: CalendarioGuardar = {
      idUsuario: this.empleado.id_user,
      fecha: this.cambiarFecha(fecha),
      contenido: this.extraerHorario(id),
      tipo: 'error',
    };

    return data;
  }

  extraerHorario(id: number) {
    this.horariosGenericos.forEach((horario) => {
      if (horario.id === id) {
        this.contCalendario =
          horario.nombre +
          ' ' +
          horario.hora_entrada +
          ' - ' +
          horario.hora_salida;
      }
    });
    return this.contCalendario;
  }

  cambiarFecha(fecha: string) {
    const fechaSeccionada = fecha.split('-');
    const fechaReves =
      fechaSeccionada[2] + '-' + fechaSeccionada[1] + '-' + fechaSeccionada[0];
    return fechaReves;
  }

  traerCalendarioId(fecha: string, id: number) {
    let data: CalendarioActualizar = {} as CalendarioActualizar;
    this.listaCalendario.forEach((evento: any) => {
      const fechaCortada = evento.fecha.substring(0, 10);
      if (fechaCortada === this.cambiarFecha(fecha)) {
        console.log(fechaCortada, this.cambiarFecha(fecha));
        this.idCalendario = evento.id;
      }
    });

    data = {
      id: this.idCalendario,
      idUsuario: this.empleado.id_user,
      fecha: this.cambiarFecha(fecha),
      contenido: this.extraerHorario(id),
      tipo: 'error',
    };

    return data;
  }

  editarCalendario(fecha: string, id: number) {
    this.calendarioService
      .eliminarEventoCalendario(this.idCalendario)
      .subscribe({
        next: (respuestaElimar: HttpClientServiceInterfaceNoPayload) => {
          console.log('calendario eliminado.');
          this.guardarCalendario(fecha, id);
        },
        error: (error) => console.log(error),
      });
  }

  //  ordenarDias(dias:DiaSemana[]){
  // dias.forEach(dia =>{
  // let fechaDia:any = dia.fecha.split('/')
  // let numero = parseInt(fechaDia[0])
  // })

  // return
  //  }
}
