import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Area } from '../../../../../informacion/interface/areas';
import { CatalogoBancos } from '../../../../../informacion/interface/catalogo-bancos';
import { Empleados } from '../../../../../informacion/interface/empleados';
import {
  EmpleadoRoles,
  Rol,
} from '../../../../../informacion/interface/empleados-roles';
import { HttpClientServiceInterface } from '../../../../../informacion/interface/httpService';
import { Puesto } from '../../../../../informacion/interface/puesto';
import { ConsultaSucursales } from '../../../../../informacion/interface/sucursales';
import { UsuarioCrear } from '../../../../../informacion/interface/usuario';
import { EmpleadosRolesService } from '../../../../../informacion/servicios/empleados-roles/empleados-roles.service';
import { EmpleadosService } from '../../../../../informacion/servicios/empleados/empleados.service';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from '../../../../../informacion/state/cargandoPeticion/cargandoPeticion.actions';
import { desencriptacion } from '../../../../../informacion/utils/encriptacion';
import { RegistroService } from '../../../../../informacion/servicios/registro/registro.service';

@Component({
  selector: 'app-modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.scss'],
})
export class ModalCrearComponent implements OnInit {
  /**
   * @Input isVisible: Trae la respuesta de la tabla de empleados para abrir el modal de crear
   */
  @Input() isVisible = false;

  /**
   * @Input catalogoBancos: contiene las catalogoBancos
   */
  @Input() catalogoBancos: Array<CatalogoBancos> = [];

  /**
   * @Input empleado: contiene la info del empleado seleccionado
   */
  @Input() empleados: Empleados[] = [];

  /**
   * @Input areas: areas de la empresa
   */
  @Input() areas: Area[] = [];

  /**
   * @Input puestos: puestos de la empresa
   */
  @Input() puestos: Puesto[] = [];

  /**
   * @Input sucursales: sucursales de la empresa
   */
  @Input() sucursales: ConsultaSucursales[] = [];

  /**
   * @Input roles: trae el array de todos los roles
   */
  @Input() roles: Rol[] = [];

  /**
   * @Output cerrarModal: envia el boleano para cerrar el modal de crear empleados
   */
  @Output() cerrarModal = new EventEmitter<boolean>();

  /**
   * @Output actEmpleado: este output envia un true que indica que se actualizo el epmleado y actualizar la vista.
   */
  @Output() actEmpleado = new EventEmitter<boolean>();

  /**
   * @Output altaEmpleado: evento para dar de alta un empleado
   */
  @Output() altaEmpleado = new EventEmitter<Empleados[]>();

  /**
   * @Input empleadosRoles: tiene todos los reoles de todos los empleados
   */
  @Output() empleadosRoles = new EventEmitter<EmpleadoRoles[]>();

  /**
   * @Variable puestosConArea: puestos filtrados por área
   */
  puestosConArea: Puesto[] = [];

  /**
   * @Variable contrasena: contraseña del usuario
   */
  contrasena = '';

  /**
   * @Variable rolesSinAsignar: roles que no estan asignados al empleado
   */
  rolesSinAsignar: Rol[] = [];

  /**
   * @Variable rolesAsignados: roles que estan asignados al empleado
   */
  rolesAsignadosCopia: Rol[] = [];

  /**
   * @Variable rolesSinAsignar: roles que no estan asignados al empleado
   */
  rolesSinAsignarCopia: Rol[] = [];

  /**
   * @Variable rolesAsignados: roles que estan asignados al empleado
   */
  rolesAsignadosEnviar: Rol[] = [];

  /**
   * @Variable rolesSinAsignar: roles que no estan asignados al empleado
   */
  rolesSinAsignarEnviar: Rol[] = [];

  /**
   * @Variable rolesAsignados: roles que estan asignados al empleado
   */
  rolesAsignados: Rol[] = [];

  /**
   * @Variable seccionFormulario: contraseña del usuario
   */
  seccionFormulario = 'general';

  /**
   * @Variable urlImagen: imagen del usuario
   */
  urlImagen: any;

  /**
   *@FormularioEmpleado empleadoForm: este formulario se usa para crear un nuevo empleado
   */
  empleadoForm: FormGroup = new FormGroup({
    id_user: new FormControl(0),
    nombres: new FormControl('', [Validators.required]),
    apellido_paterno: new FormControl('', [Validators.required]),
    apellido_materno: new FormControl('', [Validators.required]),
    fecha_nacimiento: new FormControl(''),
    genero: new FormControl(''),
    estado_civil: new FormControl(''),
    curp: new FormControl(''),
    rfc: new FormControl(''),
    nss: new FormControl(''),
    descripcion: new FormControl(''),
    telefono: new FormControl(''),
    correo_electronico: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    imagen: new FormControl(''),
    calle: new FormControl(''),
    numeroExt: new FormControl(''),
    numeroInt: new FormControl(''),
    colonia: new FormControl(''),
    codigoPostal: new FormControl(''),
    delegacion: new FormControl(''),
    ciudad: new FormControl(''),
    referencias: new FormControl(''),
  });

  /**
   *@Formulario formulario de datos laborales
   */
  datosLaboralesForm: FormGroup = new FormGroup({
    idEmpleado: new FormControl(0),
    area_id: new FormControl('', [Validators.required]),
    puesto_id: new FormControl({ value: '', disabled: true }),
    sucursal_id: new FormControl('', [Validators.required]),
    idCatalogoBanco: new FormControl(''),
    salario: new FormControl(''),
    tipoContrato: new FormControl(''),
    clabeInterbancaria: new FormControl(''),
    periodoPago: new FormControl(''),
    horas_laborales: new FormControl(''),
    idJefeInmediato: new FormControl(''),
  });

  /**
   *@FormularioUsuario userForm: este formulario se usa para crear un nuevo usuario de la aplicaciónn
   */
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    agregarRol: new FormControl(),
    uuidBD: new FormControl(),
  });

  agregarArchivo = false;

  /**
   * @formulario empleadoFormData: Formulario para guardar un empleado con imagen
   */
  empleadoFormData = new FormData();

  constructor(
    private message: NzMessageService,
    private registroService: RegistroService,
    private empleadoService: EmpleadosService,
    private store: Store,
    private empleadosRolesService: EmpleadosRolesService
  ) {}

  ngOnInit(): void {
    this.asignarRoles();
  }

  /**
   * @Metodo crea un usuario en techCode para ingresar a la plataforma
   */
  crearUsuario(): void {
    const base = desencriptacion(localStorage.getItem('uuidBD') || '');
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    this.contrasena = this.generatePassword(8);

    this.empleadoForm.patchValue({
      fecha_alta: fechaFormateada,
    });
    this.userForm.patchValue({
      email: this.empleadoForm.value.correo_electronico,
      username: this.empleadoForm.value.username,
      name: this.empleadoForm.value.nombres,
      password: this.contrasena,
      agregarRol: true,
      uuidBD: base,
    });

    this.store.dispatch(peticionActivaAction());
    this.registroService.altaUsuario(this.userForm.value).subscribe({
      next: (respuestaAlta: HttpClientServiceInterface<UsuarioCrear>) => {
        if (respuestaAlta.payload.user.id) {
          this.empleadoForm.patchValue({
            id_user: respuestaAlta.payload.user.id,
          });
          this.crearEmpleado();
        }
      },
      error: () => this.store.dispatch(peticionInactivaAction()),
    });
  }

  /**
   * @Metodo cambia el formulario para crear al empleado
   */
  selectSeccionFormulario(seccion: string): void {
    this.seccionFormulario = seccion;
  }

  //Metodo para mostrar el modal de crear empleados
  showModal() {
    this.isVisible = true;
  }

  //Este metodo genera un nuevo password para que el usuario pueda ingresar a la aplicación
  generatePassword(length: number): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const password = [];
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i++) {
      const index = values[i] % charset.length;
      password.push(charset[index]);
    }

    return password.join('');
  }

  //Metodo para cerrar el modal de crear empleados
  cerrar(): void {
    this.empleadoForm.reset();
    this.isVisible = false;
    this.cerrarModal.emit(false);
  }

  //toma la imagen seleccionada para convertirla en un objeto de javascript
  archivoImagen(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      this.empleadoForm.patchValue({ imagen: archivo });
      const reader = new FileReader();
      reader.onload = (e: any) => (this.urlImagen = e.target.result);
      reader.readAsDataURL(archivo);
    }
  }

  /**
   * @Metodo Verifica si hubo un cambio en los permisos del usuario
   */
  cambioEmpleadoRoles(): boolean {
    return (
      this.rolesAsignadosEnviar.length > 0 ||
      this.rolesSinAsignarEnviar.length > 0
    );
  }

  /**
   * @Metodo Captura el evento cuando se agrega un roal a un empleadp,
   * si el rol se agrega se guarda en un array de actualizacion, pero si se agrega
   * un rol que anteriormente tenia no se guarda en el array de actualizacion
   */
  entradaRolesNoAsignado(event: any): void {
    let elemento: any;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      elemento = event.container.data[event.currentIndex];
      const elementoExiste = this.rolesSinAsignarCopia.find(
        (rol: Rol) => elemento.id == rol.id
      );
      const elementoRepetido = this.rolesSinAsignarEnviar.find(
        (rol: Rol) => elemento.id == rol.id
      );

      const elementoRegresado = this.rolesAsignadosEnviar.find(
        (rol: Rol) => elemento.id == rol.id
      );

      if (!elementoExiste?.id && !elementoRepetido?.id)
        this.rolesSinAsignarEnviar.push(elemento);

      if (elementoRegresado?.id)
        this.rolesAsignadosEnviar = this.rolesAsignadosEnviar.filter(
          (rolesFiltro: Rol) => rolesFiltro.id !== elementoRegresado.id
        );
    }
  }

  /**
   * @Metodo Captura el evento cuando se agrega un roal a un empleadp,
   * si el rol se agrega se guarda en un array de actualizacion, pero si se agrega
   * un rol que anteriormente tenia no se guarda en el array de actualizacion
   */
  entradaRolesAsignado(event: any): void {
    let elemento: any;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      elemento = event.container.data[event.currentIndex];
      const elementoExiste = this.rolesAsignadosCopia.find(
        (rol: Rol) => elemento.id == rol.id
      );
      const elementoRepetido = this.rolesAsignadosEnviar.find(
        (rol: Rol) => elemento.id == rol.id
      );
      const elementoRegresado = this.rolesSinAsignarEnviar.find(
        (rol: Rol) => elemento.id == rol.id
      );

      if (!elementoExiste?.id && !elementoRepetido?.id)
        this.rolesAsignadosEnviar.push(elemento);

      if (elementoRegresado?.id)
        this.rolesSinAsignarEnviar = this.rolesSinAsignarEnviar.filter(
          (rolesFiltro: Rol) => rolesFiltro.id !== elementoRegresado.id
        );
    }
  }

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * @Metodo al elegir una área se filtran los puestos de dicha área
   */
  areaSeleccionada(idArea: string): void {
    this.puestosConArea = this.puestos.filter(
      (puestos: Puesto) => puestos.id_area == parseInt(idArea)
    );
    this.datosLaboralesForm.get('puesto_id')?.enable();
  }

  /**
   * @Metodo inicializa los roles signados y no asignados
   */
  private asignarRoles(): void {
    this.rolesAsignados = [];
    this.rolesAsignadosCopia = [];

    this.rolesSinAsignar = this.roles;
    this.rolesSinAsignarCopia = this.roles;
  }

  /**
   * @Metodo crea la información general de un empleado
   */
  private crearEmpleado(): void {
    this.empleadoFormData.append('id_user', this.empleadoForm.value.id_user);
    this.empleadoFormData.append('nombres', this.empleadoForm.value.nombres);
    this.empleadoFormData.append(
      'descripcion',
      this.empleadoForm.value.descripcion
    );
    this.empleadoFormData.append(
      'apellido_paterno',
      this.empleadoForm.value.apellido_paterno
    );
    this.empleadoFormData.append(
      'apellido_materno',
      this.empleadoForm.value.apellido_materno
    );
    this.empleadoFormData.append(
      'fecha_nacimiento',
      this.empleadoForm.value.fecha_nacimiento
    );
    this.empleadoFormData.append('genero', this.empleadoForm.value.genero);
    this.empleadoFormData.append(
      'estado_civil',
      this.empleadoForm.value.estado_civil
    );
    this.empleadoFormData.append('curp', this.empleadoForm.value.curp);
    this.empleadoFormData.append('rfc', this.empleadoForm.value.rfc);
    this.empleadoFormData.append('nss', this.empleadoForm.value.nss);
    this.empleadoFormData.append('telefono', this.empleadoForm.value.telefono);
    this.empleadoFormData.append(
      'correo_electronico',
      this.empleadoForm.value.correo_electronico
    );
    this.empleadoFormData.append('imagen', this.empleadoForm.value.imagen);
    this.empleadoFormData.append('calle', this.empleadoForm.value.calle);
    this.empleadoFormData.append(
      'numeroExt',
      this.empleadoForm.value.numeroExt
    );
    this.empleadoFormData.append(
      'numeroInt',
      this.empleadoForm.value.numeroInt
    );
    this.empleadoFormData.append('colonia', this.empleadoForm.value.colonia);
    this.empleadoFormData.append(
      'codigoPostal',
      this.empleadoForm.value.codigoPostal
    );
    this.empleadoFormData.append(
      'delegacion',
      this.empleadoForm.value.delegacion
    );
    this.empleadoFormData.append('ciudad', this.empleadoForm.value.ciudad);
    this.empleadoFormData.append(
      'uuidBD',
      desencriptacion(localStorage.getItem('uuidBD') || '')
    );
    this.empleadoFormData.append(
      'referencias',
      this.empleadoForm.value.referencias
    );
    this.empleadoFormData.append(
      'descripcion',
      this.empleadoForm.value.descripcion
    );
    this.empleadoFormData.append('contrasena', this.contrasena);

    this.empleadoService.crearEmpleado(this.empleadoFormData).subscribe({
      next: (empleado: HttpClientServiceInterface<number>) => {
        this.datosLaboralesForm.patchValue({
          idEmpleado: empleado.payload,
        });

        this.guardarRolesEmpleado(empleado.payload);
      },
      error: (error) => this.eliminarUsuario(this.empleadoForm.value.id_user),
    });
  }

  /**
   * @Metodo crea la información laboral de un empleado
   */
  private crearEmpleadoLaborales(): void {
    this.empleadoService
      .crearEmpleadoLaboral(this.datosLaboralesForm.value)
      .subscribe({
        next: (
          respuestaEmpleadoLaborales: HttpClientServiceInterface<Empleados[]>
        ) => {
          this.altaEmpleado.emit(respuestaEmpleadoLaborales.payload);
          this.empleadoForm.reset();
          this.datosLaboralesForm.reset();
          this.cerrarModal.emit(false);
          this.message.success(
            'Se guardo correcttamente la información del empleado'
          );
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo Guardar roles de de empleados del sistema administrativo
   */
  private guardarRolesEmpleado(idEmpleado: number): void {
    let requestRoles: any[] = [];

    this.rolesAsignadosEnviar.forEach((rol: Rol) => {
      requestRoles.push({
        idRol: rol.id,
        idEmpleado: idEmpleado,
      });
    });

    this.empleadosRolesService
      .guardarEmpleadosRoles({ roles: requestRoles })
      .subscribe({
        next: (
          respuestaGuardar: HttpClientServiceInterface<EmpleadoRoles[]>
        ) => {
          this.datosLaboralesForm.patchValue({
            salario: parseFloat(
              this.datosLaboralesForm.value.salario
                .replace('$', '')
                .replace(',', '')
            ),
          });
          this.crearEmpleadoLaborales();
          this.empleadosRoles.emit(respuestaGuardar.payload);
          this.message.success(
            'Se asignaron correctamente los roles al empleado'
          );
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo aelimina un usuario si hay errores al crear
   */
  private eliminarUsuario(id: number): void {
    this.registroService.eliminarUsuario(id).subscribe({
      next: () => {
        this.cerrarModal.emit(false);
        this.message.error(`Hubo un error al crear el empleado.`);
      },
      error: (error) => console.log(error),
    });
  }
}
