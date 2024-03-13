import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { DataHorario } from '../../interface/horarios';
import { HttpClientServiceInterface, HttpClientServiceInterfaceNoPayload } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  constructor(private http: HttpclientService) {}

  guardarHorario(
    dataHorario: DataHorario
  ): Observable<HttpClientServiceInterface<DataHorario[]>> {
    return this.http.post<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.crearHorario,
      dataHorario
    );
  }

  guardarVariosHorario(
    dataHorario: any
  ): Observable<HttpClientServiceInterface<DataHorario[]>> {
    return this.http.post<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.crearVariosHorario,
      dataHorario
    );
  }

  actualizarHorario(
    dataHorario: DataHorario,
  ): Observable<HttpClientServiceInterface<DataHorario[]>> {
    return this.http.post<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.actualizarHorario,
      dataHorario
    );
  }

  actualizarVariosHorarios(
    dataHorario: any,
  ): Observable<HttpClientServiceInterface<DataHorario[]>> {
    return this.http.post<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.actualizarVariosHorarios,
      dataHorario
    );
  }

  traeHorarioById(idEmpleado:number): Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.get<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.ConsultarHorarioByEmpleado + '/' + idEmpleado,false
    );
  }

  traeHorarioByfecha(fecha:string,idEmpleado:number): Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.get<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.ConsultarHorarioByfecha+ '/' + fecha + '/' + idEmpleado
    );
  }

  traerHorarios(): Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.get<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horarios.ConsultarHorarios
    );
  }

  eliminarHorarios(id:number):Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.delete<HttpClientServiceInterface<DataHorario[]>>(ENDPOINTS.horarios.eliminarHorario + '/' + id)
  }
}
