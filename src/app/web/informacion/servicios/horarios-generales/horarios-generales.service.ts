import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { DataHorario } from '../../interface/horarios';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosGeneralesService {
  constructor(private http: HttpclientService) {}

  guardarHorario(
    dataHorario: DataHorario,
  ): Observable<HttpClientServiceInterface<DataHorario[]>> {
    return this.http.post<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horariosGenerales.crearHorario,
      dataHorario
    );
  }

  actualizarHorario(
    dataHorario: DataHorario,
  ): Observable<HttpClientServiceInterface<DataHorario[]>> {
    return this.http.post<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horariosGenerales.actualizarHorario,
      dataHorario
    );
  }

  traeHorarioById(idEmpleado:number): Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.get<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horariosGenerales.ConsultarHorarioById + '/' + idEmpleado,false
    );
  }

  traerHorarios(): Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.get<HttpClientServiceInterface<DataHorario[]>>(
      ENDPOINTS.horariosGenerales.ConsultarHorarios
    );
  }

  eliminarHorarios(id:number):Observable<HttpClientServiceInterface<DataHorario[]>>{
    return this.http.delete<HttpClientServiceInterface<DataHorario[]>>(ENDPOINTS.horariosGenerales.eliminarHorario + '/' + id)
  }
}
