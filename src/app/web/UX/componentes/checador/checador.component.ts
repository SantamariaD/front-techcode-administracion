import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Empleados,
  RegistroAsistencias,
} from 'src/app/web/informacion/interface/empleados';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import { CambioContraseñaService } from 'src/app/web/informacion/servicios/cambioContraseña/cambio-contraseña.service';
import { EmpleadosService } from 'src/app/web/informacion/servicios/empleados/empleados.service';
import { desencriptacion } from 'src/app/web/informacion/utils/encriptacion';

@Component({
  selector: 'app-checador',
  templateUrl: './checador.component.html',
  styleUrls: ['./checador.component.scss'],
})
export class ChecadorComponent implements OnInit, DoCheck {
  @Output() registrarHorario = new EventEmitter<any>();
  @Output() cerrarModalHorario = new EventEmitter<boolean>();

  passwordForm: UntypedFormGroup = new UntypedFormGroup({
    password: new UntypedFormControl('', [Validators.required]),
  });

  /**
   * @Formulario newPasswordForm : Es el formulario para ingresar la nueva contraseña del usuario.
   */
  asistenciaForm: FormGroup = new FormGroup({
    id: new FormControl(0,[Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * @Variable confirmado:Este booleano contiene el estatus de la verificacion de contraseña actual del usuario
   */
  confirmado: boolean = false;

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados: Empleados[] = [];

  listaBusqueda:Empleados[] = [];

  /**
   * @Variable mostrarOpcionesEmpleados: Muestra las opciones del catalogo de bancos
   */
  mostrarOpcionesEmpleados = false;

  /**
   * @vaiable empleado seleccionado
   */
  empleado: Empleados = {} as Empleados;

  /**
   * @variable verificado determina si el empleado ha sido verificado para poder registrar horario
   */
  verificado=false;

  /**
   * @variable mensajeVerificado manda mensaje que la verificación fallo
   */

  mensajeVerificado=false;

  horaActual = '';

  fechaActual = '';

  diaActual = '';

  registro: RegistroAsistencias = {} as RegistroAsistencias;

  titulo = '';

  constructor(
    private servicio: CambioContraseñaService,
    private empleadoService: EmpleadosService,
    private empleadoServise: EmpleadosService,
  ) {}

  ngOnInit(): void {
    this.traerTodosEmpleados();
    this.actualizarReloj();
  }

  /**
   * @Metodo Este metodo trae todos los empleados de la base
   */
  private traerTodosEmpleados() {
    this.empleadoServise.traerTodosEmpleados().subscribe({
      next: (empleados: HttpClientServiceInterface<Array<Empleados>>) =>
        (this.empleados = empleados.payload),
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo Este metodo recibe los cambios del input de busqueda para filtrar el empleado buscado
   */
  bucarEmpleado() {
    if (this.asistenciaForm.value.nombre?.length == 0) {
      this.listaBusqueda = this.empleados;
    } else {
      this.listaBusqueda = this.empleados.filter((empleado) => {
        let nombreCompleto =
          empleado.nombres +
          ' ' +
          empleado.apellido_paterno +
          ' ' +
          empleado.apellido_materno;
        const filtro = nombreCompleto.toLocaleLowerCase();

        return filtro.includes(
          this.asistenciaForm.value.nombre?.toLocaleLowerCase() as string
        );
      });
    }
  }

  /**
   * @Metodo Mostrar opciones de empleados para el autocomplete
   */
  mostrarOpcionesEmpleadosAutocomplet(mostrar: boolean): void {
    if (this.listaBusqueda.length < 1) this.listaBusqueda = this.empleados;

    setTimeout(() => (this.mostrarOpcionesEmpleados = mostrar), 200);
  }

   /**
   * @Metodo Selecciona el empleado del autocomplete
   */
   selectOpcion(empleado: Empleados): void {
    this.asistenciaForm.patchValue({nombre:''});
    this.mostrarOpcionesEmpleados = false;
    this.empleado = empleado;

    let nombreCompleto =
      empleado.nombres +
      ' ' +
      empleado.apellido_paterno +
      ' ' +
      empleado.apellido_materno;

      this.asistenciaForm.patchValue({
        id:empleado.id_user,
        email:empleado.correo_electronico,
        nombre:nombreCompleto});
  }

  verificar(){
    this.servicio.verificarCredenciales(this.asistenciaForm.value).subscribe({
      next: () => {
        this.verificado = true,
        this.traerRegistroAsistencia();
      },  
      error: () => {
        this.mensajeVerificado = true 
      },
    });
  }

  ngDoCheck(): void {
    setTimeout(() => this.actualizarReloj(), 1000);
  }

  actualizarReloj() {
    const fecha = new Date();
    this.horaActual = this.formatearHora(fecha);
    this.fechaActual = this.formatearFecha(fecha);
    this.diaActual = this.obtenerDia(fecha);
  }

  formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString();
  }

  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString();
  }

  obtenerDia(fecha: Date): string {
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return diasSemana[fecha.getDay()];
  }

  enviar() {
    if (this.registro?.fecha) {
      const horaEntradaParts = /(\d+):(\d+):(\d+) (AM|PM)/.exec(this.registro?.hora_entrada);
const horaSalidaParts = /(\d+):(\d+):(\d+) (AM|PM)/.exec(this.horaActual);

if (horaEntradaParts && horaSalidaParts) {
  // Construir objetos Date con los valores extraídos
  const horaEntrada: Date = new Date(2000, 0, 1, 
    parseInt(horaEntradaParts[1]), // horas
    parseInt(horaEntradaParts[2]), // minutos
    parseInt(horaEntradaParts[3])  // segundos
  );
  const horaSalida: Date = new Date(2000, 0, 1, 
    parseInt(horaSalidaParts[1]), // horas
    parseInt(horaSalidaParts[2]), // minutos
    parseInt(horaSalidaParts[3])  // segundos
  );

  // Realizar cálculos con las fechas
  const diferenciaMilisegundos: number = horaSalida.getTime() - horaEntrada.getTime();
  const horasDiferencia: number = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
  const minutosDiferencia: number = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
  // Crear el objeto de datos con el resultado
  const data = {
    id: this.registro.id,
    hora_salida: this.horaActual,
    horas: `${horasDiferencia} horas y ${minutosDiferencia} minutos.`
  };
      this.empleadoService.RegistrarSalida(data).subscribe((response) => {
        this.registro = response.payload;
        this.registrarHorario.emit();
      });
    }
    } else {
      const id = this.empleado.id;
      const data = {
        id_emp: id,
        hora_entrada: this.horaActual,
        fecha: this.formateoFechaActualDiagonal(),
      };

      this.empleadoService.RegistrarEntrada(data).subscribe({
        next: (response: HttpClientServiceInterface<RegistroAsistencias>) => {
          this.registro = response.payload;
          this.registrarHorario.emit();
        },
        error: (error) => console.log(error),
      });
    }
  }

  cerrarModal() {
    this.cerrarModalHorario.emit(false);
  }

  cambioTitulo() {
    if (!this.registro.hora_entrada) {
      this.titulo = 'Registra tu hora de entrada';
    } else if (this.registro.hora_entrada && !this.registro.hora_salida) {
      this.titulo = 'Registra tu hora de salida';
    } else if (this.registro.hora_salida) {
      this.titulo = 'Haz concluido tu jornada hoy';
    }
  }

  /**
   * @Metodo trae el registro de asistencia del empleado
   */
  private traerRegistroAsistencia() {
    

    const id = this.empleado.id;

    this.empleadoService
      .traerRegistro(id, this.formateoFechaActual())
      .subscribe((response) => {
        if (response.error === 'El registro no se encontro.') {
          this.cambioTitulo();
        } else {
          this.registro = response.payload;
          this.cambioTitulo();
        }
      });
  }

  /**
   * @Metodo devuelve la fecha actual en formato string
   */
  private formateoFechaActual(): string {
    const fechaOriginal = new Date();
    const year = fechaOriginal.getFullYear();
    const month = String(fechaOriginal.getMonth() + 1).padStart(2, '0');
    const newday = String(fechaOriginal.getDate()).padStart(2, '0');
    return `${newday}${month}${year}`;
  }

  /**
   * @Metodo devuelve la fecha actual en formato string con guio
   */
  private formateoFechaActualDiagonal(): string {
    const fechaOriginal = new Date();
    const year = fechaOriginal.getFullYear();
    const month = String(fechaOriginal.getMonth() + 1).padStart(2, '0');
    const newday = String(fechaOriginal.getDate()).padStart(2, '0');
    return `${newday}/${month}/${year}`;
  }

  resetearModalError(){
    this.mensajeVerificado = false;
  }
}
