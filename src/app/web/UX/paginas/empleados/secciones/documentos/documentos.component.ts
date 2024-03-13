import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import {
  Empleados,
  EmpleadosStore,
} from '../../../../../informacion/interface/empleados';
import { HttpClientServiceInterface } from '../../../../../informacion/interface/httpService';
import { EmpleadosService } from '../../../../../informacion/servicios/empleados/empleados.service';
import { PlantillaService } from '../../../../../informacion/servicios/plantilla-Documentos/plantilla.service';
import { selectEmpleadosStore } from '../../../../../informacion/state';
import { ENDPOINTS } from '../../../../../informacion/utils/endpoint';
import { verificarPermisos } from '../../../../../informacion/utils/funciones';
import { environment } from '../../../../../../../environments/environment';
import { ConsultaPlantillaDocumentoEmpleado, PlantillaDocumento } from '../../../../../informacion/interface/documentos';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit {
  /**
   * @Variable abre el modal para agregar una nueva plantilla de documento
   */
  abrirModalAgregarPlantillaDocumento = false;

  /**
   * @Variable abre el modal para actualizar una nueva plantilla de documento
   */
  abrirModalActualizarPlantillaDocumento = false;

  /**
   * @Variable contiene todas las plantillas de documentos que se solicitan
   */
  plantillas: PlantillaDocumento[] = [];

  /**
   * @Variable contiene todas las plantillas de documentos que se solicitan
   */
  plantillasCopia: PlantillaDocumento[] = [];

  /**
   * @Variable contiene la información de la plantilla que se va a actualizar
   */
  plantillaActualizar: PlantillaDocumento = {} as PlantillaDocumento;

  /**
   * empleado: el empleado que envia la card para consulta de documentos
   */
  empleado: Empleados = {} as Empleados;

  /**
   * @Variable listaBusqueda: trae el resultado de la busqueda de empleados
   */
  listaBusqueda: Empleados[] = [];

  /**
   * @variable empleados: trae el array de todos los empleados
   */
  empleados: Empleados[] = [];

  /**
   * @Variable mostrarOpcionesEmpleados: Muestra las opciones del catalogo de bancos
   */
  mostrarOpcionesEmpleados = false;

  /**
   * @variable documentos: trae el array de todos los documentos del empleado actual
   */
  platillasDocumentosEmpleado: ConsultaPlantillaDocumentoEmpleado[] = [];

  /**
   * @variable plantilla de documento seleccionada para evaluar
   */
  plantillaDocumento: ConsultaPlantillaDocumentoEmpleado =
    {} as ConsultaPlantillaDocumentoEmpleado;

  /**
   * @variable mostrarVisor: este booleano muestra el visor de documentos o lo oculta
   */
  mostrarVisor = false;

  /**
   * @variable urlDescarga: contiene la url de descarga que necesita el visor de documentos
   */
  urlDescarga = '';

  /**
   * @variable abre el modal para evaluar el documento que subio el empleado
   */
  abrirModalEvaluar = false;

  /**
   * @Formulario buscador:toma el valor que se escribe en el buscador para empleados
   */
  formBusqueda: FormGroup = new FormGroup({
    buscador: new FormControl(''),
  });

  /**
   * @Formulario formulario para evaluar un documento
   */
  evaluarForm: FormGroup = new FormGroup({
    aceptar: new FormControl(false, [Validators.required]),
    rechazar: new FormControl(false, [Validators.required]),
    comentario: new FormControl('', [Validators.required]),
  });

  /**
   * @Formulario formulario para evaluar un documento
   */

  /**
   * @Formulario buscador:toma el valor que se escribe en el buscador para empleados
   */
  buscadorNombreEmpleado = new FormControl('');

  constructor(
    private empleadoServise: EmpleadosService,
    private store: Store,
    private platillaService: PlantillaService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.traerTodosEmpleados();
    this.traerPlantillas();
  }

  /**
   * @Metodo Este metodo recibe los cambios del input de busqueda para filtrar el empleado buscado
   */
  bucarEmpleado() {
    if (this.buscadorNombreEmpleado.value?.length == 0) {
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
          this.buscadorNombreEmpleado.value?.toLocaleLowerCase() as string
        );
      });
    }
  }

  // Modal que evalua si un documento es aceptado o no
  modalRevision(): void {
    let formData = new FormData()
    let estatus = this.evaluarForm.value.aceptar ? 'Aceptado' : 'Rechazado';
    formData.append('idEmpleado', this.plantillaDocumento.idEmpleado.toString())
    formData.append('id', this.plantillaDocumento.id.toString())
    formData.append('estatus', estatus)
    formData.append('comentarios', this.evaluarForm.value.comentario)

    this.empleadoServise
      .actualizarPlantillaDocumentoEmpleado(formData)
      .subscribe({
        next: (
          respuestaActualizar: HttpClientServiceInterface<
            ConsultaPlantillaDocumentoEmpleado[]
          >
        ) => {
          this.platillasDocumentosEmpleado = respuestaActualizar.payload;
          this.message.success('Se evaluo correctamente el documento');
          this.abrirModalEvaluar = false;
          this.evaluarForm.reset();
        },
      });
  }

  // abrirVisor este metodo genera los parametros que recibe el visor de documentos y activa el booleano que lo muestra
  abrirVisor(plantilla: ConsultaPlantillaDocumentoEmpleado) {
    this.mostrarVisor = true;
    this.urlDescarga =
      environment.urls.apiSistemaAdministrativo +
      ENDPOINTS.empleados.descargarDocumento +
      '/' +
      plantilla.uuid +
      '/' +
      plantilla.extension +
      '/' +
      plantilla.idEmpleado;
  }

  /**
   * @Metodo abre el modal para evaluar documento
   */
  evaluarDocumento(plantillaDocumento: ConsultaPlantillaDocumentoEmpleado) {
    this.plantillaDocumento = plantillaDocumento;
    this.abrirModalEvaluar = true;
  }

  /**
   * @Metodo Desasigna un documento al empleado que fue solicitado
   */
  desasignarPlantillaDocumento(
    plantillaDocumentoEmpleado: ConsultaPlantillaDocumentoEmpleado
  ) {
    const request = {
      id: plantillaDocumentoEmpleado.id,
      idEmpleado: plantillaDocumentoEmpleado.idEmpleado,
    };

    this.empleadoServise
      .desasignarPlantillaDocumentoEmpleado(request)
      .subscribe({
        next: (
          respuestaDesasignar: HttpClientServiceInterface<
            ConsultaPlantillaDocumentoEmpleado[]
          >
        ) => {
          this.platillasDocumentosEmpleado = respuestaDesasignar.payload;
          this.actualizarPlantillasDocumentosEpleado();
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * @Metodo Elimina una plantilla de documento ya existente
   */
  eliminarPlantillaDocumento(plantilla: PlantillaDocumento) {
    const request = {
      id: plantilla.id,
      activo: 'eliminar',
    };

    this.actualizarDocumentoSolicitado(request);
  }

  /**
   * @Metodo Abre el modal para editar una plantilla de documento ya existente
   */
  editarPlantillaDocumento(plantilla: PlantillaDocumento) {
    this.plantillaActualizar = plantilla;
    this.abrirModalActualizarPlantillaDocumento = true;
  }

  /**
   * @Metodo solicita un documento a un empleado para que pueda cargarlo
   */
  agregarPlantillaDocumento(plantilla: PlantillaDocumento) {
    const request = {
      idEmpleado: this.empleado.id,
      idPlantillaDocumento: plantilla.id,
      estatus: 'Sin Agregar',
    };

    this.empleadoServise.asignarPlantillaDocumento(request).subscribe({
      next: (
        respuestaAsignar: HttpClientServiceInterface<
          ConsultaPlantillaDocumentoEmpleado[]
        >
      ) => {
        this.platillasDocumentosEmpleado = respuestaAsignar.payload;
        this.actualizarPlantillasDocumentosEpleado();
        this.message.success(
          'Se asigno correctamente la plantilla de documento al empleado'
        );
      },
    });
  }

  /**
   * @Metodo Selecciona el empleado del autocomplete
   */
  selectOpcion(empleado: Empleados): void {
    this.buscadorNombreEmpleado.setValue('');
    this.mostrarOpcionesEmpleados = false;
    this.empleado = empleado;

    let nombreCompleto =
      empleado.nombres +
      ' ' +
      empleado.apellido_paterno +
      ' ' +
      empleado.apellido_materno;

    this.buscadorNombreEmpleado.setValue(nombreCompleto);

    this.consultarPlantillasDocumentosEmpleado();
  }

  /**
   * @Metodo Mostrar opciones de empleados para el autocomplete
   */
  mostrarOpcionesEmpleadosAutocomplet(mostrar: boolean): void {
    if (this.listaBusqueda.length < 1) this.listaBusqueda = this.empleados;

    setTimeout(() => (this.mostrarOpcionesEmpleados = mostrar), 200);
  }

  /**
   * @Metodo guarda el documento que se solicita a los empleados
   */
  guardarDocumentoSolicitado(documento: any): void {
    this.platillaService.crearPlantilla(documento).subscribe({
      next: (
        respuestaPlantilla: HttpClientServiceInterface<PlantillaDocumento[]>
      ) => {
        this.plantillas = respuestaPlantilla.payload;
        this.plantillasCopia = respuestaPlantilla.payload;
        this.abrirModalAgregarPlantillaDocumento = false;
        this.actualizarPlantillasDocumentosEpleado();
        this.message.success('Se creo correctamente la plantilla de documento');
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @Metodo actualiza el documento que se solicita a los empleados
   */
  actualizarDocumentoSolicitado(documento: any): void {
    this.platillaService.actualizarPlantilla(documento).subscribe({
      next: (
        respuestaPlantilla: HttpClientServiceInterface<PlantillaDocumento[]>
      ) => {
        this.plantillas = respuestaPlantilla.payload;
        this.plantillasCopia = respuestaPlantilla.payload;
        this.abrirModalActualizarPlantillaDocumento = false;
        this.actualizarPlantillasDocumentosEpleado();
        this.message.success(
          'Se actualizó la plantilla de documento correctamente'
        );
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
   * @metodo Consulta las plantillas de los documentos que se solicitan
   */
  private actualizarPlantillasDocumentosEpleado(): void {
    this.plantillas = this.plantillasCopia.filter(
      (plantilla: PlantillaDocumento) => {
        return !this.platillasDocumentosEmpleado.some(
          (plantillaEmpleado: ConsultaPlantillaDocumentoEmpleado) =>
            plantilla.id == plantillaEmpleado.idPlantillaDocumento
        );
      }
    );
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
   * @metodo Consulta las plantillas de los documentos que se solicitan
   */
  private traerPlantillas() {
    this.platillaService.traerPlantillas().subscribe({
      next: (
        consultarPlantilla: HttpClientServiceInterface<PlantillaDocumento[]>
      ) => {
        this.plantillas = consultarPlantilla.payload;
        this.plantillasCopia = consultarPlantilla.payload;
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * @metodo Este metodo trae todos los documentos solicitados al empleado
   */
  private consultarPlantillasDocumentosEmpleado() {
    this.empleadoServise
      .consultarPlantillasDocumentosEmpleados(this.empleado.id)
      .subscribe({
        next: (
          respuestaDocumentos: HttpClientServiceInterface<
            ConsultaPlantillaDocumentoEmpleado[]
          >
        ) => {
          this.platillasDocumentosEmpleado = respuestaDocumentos.payload;
          this.actualizarPlantillasDocumentosEpleado();
        },
        error: (error) => console.log(error),
      });
  }
}
