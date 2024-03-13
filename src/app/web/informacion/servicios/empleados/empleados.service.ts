import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import {
  ConsultaPlantillaDocumentoEmpleado,
  Documento,
} from '../../interface/documentos';
import { Empleados, RegistroAsistencias } from '../../interface/empleados';
import { desencriptacion } from '../../utils/encriptacion';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio consulta todos los empleados
   */
  traerTodosEmpleados(): Observable<
    HttpClientServiceInterface<Array<Empleados>>
  > {
    const uuidbd = desencriptacion(localStorage.getItem('uuidBD') || '');
    return this.http.get<HttpClientServiceInterface<Array<Empleados>>>(
      ENDPOINTS.empleados.traerEmpleados + '/' + uuidbd
    );
  }

  /**
   * @Servicio actualiza la informacion general del empleado
   */
  actualizarEmpleado(
    empleado: any
  ): Observable<HttpClientServiceInterface<Empleados[]>> {
    return this.http.post<HttpClientServiceInterface<Empleados[]>>(
      ENDPOINTS.empleados.actualizarEmpleado,
      empleado
    );
  }

  /**
   * @Servicio actualiza la información laboral del empleado
   */
  actualizarEmpleadoLaboral(
    empleado: any
  ): Observable<HttpClientServiceInterface<Empleados[]>> {
    return this.http.put<HttpClientServiceInterface<Empleados[]>>(
      ENDPOINTS.empleados.actualizarEmpleadoLaboral,
      empleado
    );
  }

  /**
   * @Servicio elimina un empleado
   */
  eliminarEmpleado(
    id: number
  ): Observable<HttpClientServiceInterface<Empleados[]>> {
    return this.http.delete<HttpClientServiceInterface<Empleados[]>>(
      ENDPOINTS.empleados.eliminarEmpleado + '/' + id
    );
  }

  /**
   * @Servicio Consulta toda la información de un empleado
   */
  consultarEmpleado(
    id: number
  ): Observable<HttpClientServiceInterface<Empleados>> {
    const uuidbd = desencriptacion(localStorage.getItem('uuidBD') || '');
    return this.http.get<HttpClientServiceInterface<Empleados>>(
      ENDPOINTS.empleados.traerEmpleado + '/' + id + '/' + uuidbd
    );
  }

  /**
   * @Servicio trae la foto del empleado
   */
  traerFoto(
    uuid: string,
    extension: string,
    nombre: string
  ): Observable<string> {
    return this.http.get<string>(
      ENDPOINTS.empleados.traerFotografia +
        '/' +
        uuid +
        '/' +
        extension +
        '/' +
        nombre
    );
  }

  /**
   * @Servicio guarda la información básica de un empleado
   */
  crearEmpleado(empleado: any): Observable<HttpClientServiceInterface<number>> {
    return this.http.post<HttpClientServiceInterface<number>>(
      ENDPOINTS.empleados.crearEmpleado,
      empleado
    );
  }

  /**
   * @Servicio guarda la información laboral de un empleado
   */
  crearEmpleadoLaboral(
    empleado: any
  ): Observable<HttpClientServiceInterface<Empleados[]>> {
    return this.http.post<HttpClientServiceInterface<Empleados[]>>(
      ENDPOINTS.empleados.crearEmpleadoLaboral,
      empleado
    );
  }

  /**
   * @Servicio asigna una plantilla de documento al empleado
   */
  asignarPlantillaDocumento(documento: any) {
    return this.http.post<
      HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
    >(ENDPOINTS.empleados.guardarDocumentos, documento);
  }

  /**
   * @Servicio consulta los documentos que han sido asignados al empleado
   */
  consultarPlantillasDocumentosEmpleados(
    id: number
  ): Observable<
    HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
  > {
    return this.http.get<
      HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
    >(ENDPOINTS.empleados.traerTodosDocumentos + '/' + id);
  }

  /**
   * @Servicio Desasigna un plantilla de documento a un empleado para no tenerla asignada
   */
  desasignarPlantillaDocumentoEmpleado(
    plantilla: any
  ): Observable<
    HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
  > {
    return this.http.post<
      HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
    >(ENDPOINTS.empleados.eliminarDocumento, plantilla);
  }

  // Método para actualizar el archivo de un documento
  actualizarPlantillaDocumentoEmpleado(
    documento: any
  ): Observable<
    HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
  > {
    return this.http.post<
      HttpClientServiceInterface<ConsultaPlantillaDocumentoEmpleado[]>
    >(ENDPOINTS.empleados.actualizarDocumento, documento);
  }

  // Método para guardar el registro de entrada del empleado.
  RegistrarEntrada(
    registro: any
  ): Observable<HttpClientServiceInterface<RegistroAsistencias>> {
    return this.http.post<HttpClientServiceInterface<RegistroAsistencias>>(
      ENDPOINTS.empleados.guardarAsistencia,
      registro
    );
  }

  // Método para guardar el registro de salida del empleado.
  RegistrarSalida(
    registro: any
  ): Observable<HttpClientServiceInterface<RegistroAsistencias>> {
    return this.http.post<HttpClientServiceInterface<RegistroAsistencias>>(
      ENDPOINTS.empleados.actualizarAsistencia,
      registro
    );
  }

  traerRegistro(
    id_emp: number,
    fecha: string
  ): Observable<HttpClientServiceInterface<RegistroAsistencias>> {
    return this.http.get<HttpClientServiceInterface<RegistroAsistencias>>(
      ENDPOINTS.empleados.traerRegistro + '/' + id_emp + '/' + fecha
    );
  }
}
