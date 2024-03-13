import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { NominaGlobal, NominaGlobalEmpleado } from '../../interface/nominas';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class NominasService {
  constructor(private http: HttpclientService) {}

  crearNominaGlobal(
    dataNomina: any
  ): Observable<HttpClientServiceInterface<NominaGlobal>> {
    return this.http.post<HttpClientServiceInterface<NominaGlobal>>(
      ENDPOINTS.nominas.crearNominaGlobal,
      dataNomina
    );
  }

  editarNominaGlobal(
    dataNomina: NominaGlobal
  ): Observable<HttpClientServiceInterface<NominaGlobal>> {
    return this.http.post<HttpClientServiceInterface<NominaGlobal>>(
      ENDPOINTS.nominas.editarNominaGlobal,
      dataNomina
    );
  }

  crearNominaEmpleado(
    datos: any
  ): Observable<HttpClientServiceInterface<NominaGlobalEmpleado>> {
    return this.http.post<HttpClientServiceInterface<NominaGlobalEmpleado>>(
      ENDPOINTS.nominas.crearNominaEmpleado,
      datos
    );
  }

  editarNominEmpleado(
    dataNomina: NominaGlobalEmpleado
  ): Observable<HttpClientServiceInterface<NominaGlobalEmpleado>> {
    return this.http.post<HttpClientServiceInterface<NominaGlobalEmpleado>>(
      ENDPOINTS.nominas.editarNominaEmpleado,
      dataNomina
    );
  }

  traerNominasEmpleado(): Observable<
    HttpClientServiceInterface<NominaGlobalEmpleado[]>
  > {
    return this.http.get<HttpClientServiceInterface<NominaGlobalEmpleado[]>>(
      ENDPOINTS.nominas.consultarNominasEmpleado
    );
  }

  traerNominasEmpleadoById(
    idNomina: number
  ): Observable<HttpClientServiceInterface<NominaGlobalEmpleado[]>> {
    return this.http.get<HttpClientServiceInterface<NominaGlobalEmpleado[]>>(
      ENDPOINTS.nominas.ConsultarNominaEmpleadoById + '/' + idNomina
    );
  }

  traerNominasEmpleadoByPeriodo(
    periodo: string
  ): Observable<HttpClientServiceInterface<NominaGlobalEmpleado[]>> {
    return this.http.get<HttpClientServiceInterface<NominaGlobalEmpleado[]>>(
      ENDPOINTS.nominas.ConsultarNominaEmpleadoByPeriodo + '/' + periodo
    );
  }

  traerNominasGlobal(): Observable<HttpClientServiceInterface<NominaGlobal[]>> {
    return this.http.get<HttpClientServiceInterface<NominaGlobalEmpleado[]>>(
      ENDPOINTS.nominas.consultarNominasGlobal
    );
  }
}
