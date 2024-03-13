import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Area } from '../../interface/areas';
import { ENDPOINTS } from '../../utils/endpoint';
import { Puesto } from '../../interface/puesto';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class PuestosService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Crea un nuevo puesto
   */
  crearPuesto(data: any): Observable<HttpClientServiceInterface<Puesto[]>> {
    return this.http.post<HttpClientServiceInterface<Puesto[]>>(
      ENDPOINTS.puestos.crearPuesto,
      data
    );
  }

  /**
   * @Servicio Actualiza un puesto
   */
  actualizarPuesto(
    data: any
  ): Observable<HttpClientServiceInterface<Puesto[]>> {
    return this.http.post<HttpClientServiceInterface<Puesto[]>>(
      ENDPOINTS.puestos.actualizarPuesto,
      data
    );
  }

  /**
   * @Servicio Consulta todos los puesto
   */
  consultarPuestos(): Observable<HttpClientServiceInterface<Puesto[]>> {
    return this.http.get<HttpClientServiceInterface<Puesto[]>>(
      ENDPOINTS.puestos.consultarPuestos
    );
  }

  /**
   * @Servicio Elimina un puesto
   */
  eliminarPuesto(id: number): Observable<HttpClientServiceInterface<Puesto[]>> {
    return this.http.delete<HttpClientServiceInterface<Puesto[]>>(
      ENDPOINTS.puestos.eliminarPuesto + '/' + id
    );
  }
}
