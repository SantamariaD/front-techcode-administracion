import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Area } from '../../../../../informacion/interface/areas';
import { CatalogoBancos } from '../../../../../informacion/interface/catalogo-bancos';
import { Empleados } from '../../../../../informacion/interface/empleados';
import {
  EmpleadoRoles,
  Rol,
} from '../../../../../informacion/interface/empleados-roles';
import { Puesto } from '../../../../../informacion/interface/puesto';
import { ConsultaSucursales } from '../../../../../informacion/interface/sucursales';
import { UsuarioInterface } from '../../../../../informacion/interface/usuario';
import { desencriptacion } from '../../../../../informacion/utils/encriptacion';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss'],
})
export class ModalEditarComponent implements OnInit {
  /**
   * @Input empleado: este input recibe el empleado seleccio0nado para editar
   */
  @Input() empleado: Empleados = {} as Empleados;

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
   * @Input catalogoBancos: contiene las catalogoBancos
   */
  @Input() catalogoBancos: Array<CatalogoBancos> = [];

  /**
   * @Input sucursales: sucursales de la empresa
   */
  @Input() sucursales: ConsultaSucursales[] = [];

  /**
   * @Input empleadosRoles: tiene todos los reoles de todos los empleados
   */
  @Input() empleadosRoles: EmpleadoRoles[] = [];

  /**
   * @Input roles: trae el array de todos los roles
   */
  @Input() roles: Rol[] = [];

  /**
   * @Output editarEmpleado: este output envia un true que indica
   * que se actualizo la informacion general del epmleado y actualizar la vista.
   */
  @Output() editarEmpleado = new EventEmitter<any>();

  /**
   * @Output editarEmpleado: este output envia un true que indica
   * que se actualizo la información laboral de epmleado y actualizar la vista.
   */
  @Output() editarEmpleadoLaboral = new EventEmitter<Empleados>();

  /**
   * @Output array con los roles a asignar del empleado.
   */
  @Output() guardarEmpleadoRoles = new EventEmitter<any[]>();

  /**
   * @Output array con los roles a liminar del empleado.
   */
  @Output() eliminarEmpleadoRoles = new EventEmitter<any[]>();

  /**
   * @Output editarImagen: este output envia el evento cuando se actualiza la imagen del empleado
   */
  @Output() editarImagen = new EventEmitter<FormData>();

  /**
   * @formulario empleadoFormData: Formulario para guardar un empleado con imagen
   */
  empleadoFormData = new FormData();

  /**
   * @Variable puestosConArea: puestos filtrados por área
   */
  puestosConArea: Puesto[] = [];

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
   * @usuario: contiene los datos del usuario de la aplicación.
   */
  usuario: UsuarioInterface = {} as UsuarioInterface;

  /**
   * @variable seleccion: contiene el area de datos seleccionada para ver
   */
  seleccion = 'datosGenerales';

  /**
   * @Variable urlImagen: imagen del usuario
   */
  urlImagen: any;

  /**
   * @Variable imagenBase64: imagen del usuario
   */
  imagenBase64: any;

  /**
   * @Variable cardEditar: muestra la card sin editar (false) o con editar (true)
   */
  cardEditar = true;

  /**
   *@FormularioEmpleado formulario de los datos básicos del empleado
   */
  datosBasicosForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombres: new FormControl(''),
    apellido_paterno: new FormControl(''),
    apellido_materno: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    input1: new FormControl(''),
    input2: new FormControl(''),
    input3: new FormControl(''),
    genero: new FormControl(''),
    estado_civil: new FormControl(''),
    curp: new FormControl(''),
    rfc: new FormControl(''),
    nss: new FormControl(''),
    descripcion: new FormControl(),
    telefono: new FormControl(''),
    correo_electronico: new FormControl(''),
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
    idEmpleado: new FormControl(),
    area_id: new FormControl(),
    puesto_id: new FormControl(),
    sucursal_id: new FormControl(),
    idCatalogoBanco: new FormControl(),
    salario: new FormControl(),
    tipoContrato: new FormControl(),
    clabeInterbancaria: new FormControl(),
    periodoPago: new FormControl(),
    fechaAlta: new FormControl(),
    fechaBaja: new FormControl(),
    fechaReingreso: new FormControl(),
    horas_laborales: new FormControl(),
    idJefeInmediato: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {
    this.poblarFormulario();
    this.puestosConArea = this.puestos;
    this.imagenBase64 = this.empleado.archivoImagen;
  }

  /**
   * @Metodo Metodo para actualizar el empleado
   */
  actualizarEmpleado(): void {
    let formData = new FormData();
    this.datosBasicosForm.patchValue({
      fecha_nacimiento:
        this.datosBasicosForm.value.input1 +
        '/' +
        this.datosBasicosForm.value.input2 +
        '/' +
        this.datosBasicosForm.value.input3,
    });
    formData.append(
      'apellido_materno',
      this.datosBasicosForm.value.apellido_materno
    );
    formData.append(
      'apellido_paterno',
      this.datosBasicosForm.value.apellido_paterno
    );
    formData.append('calle', this.datosBasicosForm.value.calle);
    formData.append('ciudad', this.datosBasicosForm.value.ciudad);
    formData.append('codigoPostal', this.datosBasicosForm.value.codigoPostal);
    formData.append('colonia', this.datosBasicosForm.value.colonia);
    formData.append(
      'correo_electronico',
      this.datosBasicosForm.value.correo_electronico
    );
    formData.append('curp', this.datosBasicosForm.value.curp);
    formData.append('delegacion', this.datosBasicosForm.value.delegacion);
    formData.append('descripcion', this.datosBasicosForm.value.descripcion);
    formData.append('estado_civil', this.datosBasicosForm.value.estado_civil);
    formData.append(
      'fecha_nacimiento',
      this.datosBasicosForm.value.fecha_nacimiento
    );
    formData.append('genero', this.datosBasicosForm.value.genero);
    formData.append('id', this.datosBasicosForm.value.id);
    formData.append('nombres', this.datosBasicosForm.value.nombres);
    formData.append('nss', this.datosBasicosForm.value.nss);
    formData.append('numeroExt', this.datosBasicosForm.value.numeroExt);
    formData.append('numeroInt', this.datosBasicosForm.value.numeroInt);
    formData.append('referencias', this.datosBasicosForm.value.referencias);
    formData.append('rfc', this.datosBasicosForm.value.rfc);
    formData.append('telefono', this.datosBasicosForm.value.telefono);

    this.editarEmpleado.emit(formData);
  }

  /**
   * @Metodo Metodo para actualizar la información laboral del empleado
   */
  actualizarEmpleadoLaborales(): void {
    this.datosLaboralesForm.get('puesto_id')?.enable();
    this.datosLaboralesForm.get('idEmpleado')?.enable();
    this.datosLaboralesForm.patchValue({
      salario: this.datosLaboralesForm.value.salario
        .replace('$', '')
        .replace(',', ''),
    });

    this.editarEmpleadoLaboral.emit(this.datosLaboralesForm.value);
  }

  /**
   * @Metodo Cambia la sección del modal
   */
  cambiarSeccion(seccion: string): void {
    this.seleccion = seccion;
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
   * @Metodo Abre ventana para seleccionar imagen
   */
  openFileInput(): void {
    const fileInput = document.getElementById('imagenEmpleado');
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * @metodo toma la imagen seleccionada para convertirla en un objeto de javascript
   */
  archivoImagen(event: any): void {
    const archivo = event.target.files[0];

    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.urlImagen = e.target.result);
      reader.readAsDataURL(archivo);
      this.imagenBase64 = null;

      this.empleadoFormData.append('id', this.empleado.id.toString());
      this.empleadoFormData.append('imagen', archivo);
      this.empleadoFormData.append('nombreImagen', this.empleado.imagen);
      this.empleadoFormData.append('extension', this.empleado.extension);
      this.empleadoFormData.append(
        'uuidBD',
        desencriptacion(localStorage.getItem('uuidBD') || '')
      );
      this.editarImagen.emit(this.empleadoFormData);
    }
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
   * @Metodo actualiza los roles del empleado
   */
  actualizarRoles(): void {
    let rolesAsignadosRequest: any[] = [];
    let rolesSinAsignarRequest: any[] = [];

    if (this.rolesAsignadosEnviar.length > 0) {
      this.rolesAsignadosEnviar.forEach((rol: Rol) => {
        rolesAsignadosRequest.push({
          idEmpleado: this.empleado.id,
          idRol: rol.id,
        });
      });
      this.guardarEmpleadoRoles.emit(rolesAsignadosRequest);
    }

    if (this.rolesSinAsignarEnviar.length > 0) {
      this.rolesSinAsignarEnviar.forEach((rol: Rol) => {
        rolesSinAsignarRequest.push({
          idEmpleado: this.empleado.id,
          idRol: rol.id,
        });
      });
      this.eliminarEmpleadoRoles.emit(rolesSinAsignarRequest);
    }
  }

  /**
   * @Metodo Llena el formulario de editar
   */
  private poblarFormulario(): void {
    const fecha = this.empleado?.fecha_nacimiento?.split('/');
    const fechaIngreso = this.empleado?.fechaAlta?.split(' ')[0].split('-');

    this.datosBasicosForm.patchValue({
      id: this.empleado.id,
      nombres: this.empleado.nombres,
      apellido_paterno: this.empleado.apellido_paterno,
      apellido_materno: this.empleado.apellido_materno,
      input1: fecha ? fecha[0] : '',
      input2: fecha ? fecha[1] : '',
      input3: fecha ? fecha[2] : '',
      genero: this.empleado.genero,
      estado_civil: this.empleado.estado_civil,
      curp: this.empleado.curp,
      rfc: this.empleado.rfc,
      nss: this.empleado.nss,
      telefono: this.empleado.telefono,
      correo_electronico: this.empleado.correo_electronico,
      calle: this.empleado.calle,
      numeroExt: this.empleado.numeroExt,
      numeroInt: this.empleado.numeroInt,
      colonia: this.empleado.colonia,
      codigoPostal: this.empleado.codigoPostal,
      delegacion: this.empleado.delegacion,
      ciudad: this.empleado.ciudad,
      referencias: this.empleado.referencias,
      descripcion: this.empleado.descripcion,
    });

    const salario =
      typeof this.empleado?.salario == 'string'
        ? this.empleado?.salario?.replace('$', '').replace(',', '')
        : this.empleado?.salario;

    this.datosLaboralesForm.patchValue({
      idEmpleado: this.empleado.id,
      area_id: this.empleado.area_id,
      puesto_id: this.empleado.puesto_id,
      sucursal_id: this.empleado.sucursal_id,
      idCatalogoBanco: this.empleado.idCatalogoBanco,
      salario,
      horas_laborales: this.empleado.horas_laborales,
      tipoContrato: this.empleado.tipoContrato,
      periodoPago: this.empleado.periodoPago,
      clabeInterbancaria: this.empleado.clabeInterbancaria,
      idJefeInmediato: this.empleado.idJefeInmediato,
      fechaAlta:
        fechaIngreso[2] + '/' + fechaIngreso[1] + '/' + fechaIngreso[0],
    });

    this.datosLaboralesForm.get('idEmpleado')?.disable();
    this.datosLaboralesForm.get('fechaAlta')?.disable();
    this.datosLaboralesForm.get('puesto_id')?.disable();

    this.rolesAsignados = this.roles.filter((rol: Rol) => {
      return this.empleadosRoles.some(
        (empleadoRol: EmpleadoRoles) =>
          empleadoRol.idEmpleado == this.empleado.id &&
          empleadoRol.idRol == rol.id
      );
    });
    this.rolesAsignadosCopia = this.roles.filter((rol: Rol) => {
      return this.empleadosRoles.some(
        (empleadoRol: EmpleadoRoles) =>
          empleadoRol.idEmpleado == this.empleado.id &&
          empleadoRol.idRol == rol.id
      );
    });

    this.rolesSinAsignar = this.roles.filter((rol: Rol) => {
      return !this.empleadosRoles.some(
        (empleadoRol: EmpleadoRoles) =>
          empleadoRol.idEmpleado === this.empleado.id &&
          empleadoRol.idRol === rol.id
      );
    });
    this.rolesSinAsignarCopia = this.roles.filter((rol: Rol) => {
      return !this.empleadosRoles.some(
        (empleadoRol: EmpleadoRoles) =>
          empleadoRol.idEmpleado === this.empleado.id &&
          empleadoRol.idRol === rol.id
      );
    });
  }
}
