import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../../interface/areas';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { HttpclientService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Crea una nueva área para la empresa
   */
  crearArea(data: any): Observable<HttpClientServiceInterface<Area[]>> {
    return this.http.post<HttpClientServiceInterface<Area[]>>(
      ENDPOINTS.areas.crearArea,
      data
    );
  }

  /**
   * @Servicio Actualiza una nueva área para la empresa
   */
  actualizarArea(data: any): Observable<HttpClientServiceInterface<Area[]>> {
    return this.http.post<HttpClientServiceInterface<Area[]>>(
      ENDPOINTS.areas.actualizarArea,
      data
    );
  }

  /**
   * @Servicio Consulta las áreas de la empresa
   */
  consultarAreas(): Observable<HttpClientServiceInterface<Area[]>> {
    return this.http.get<HttpClientServiceInterface<Area[]>>(
      ENDPOINTS.areas.consultarAreas
    );
  }

  /**
   * @Servicio Elimina una área de la empresa y lo asociado a ella se cambia a sin area
   */
  eliminarArea(id: number): Observable<HttpClientServiceInterface<Area[]>> {
    return this.http.delete<HttpClientServiceInterface<Area[]>>(
      ENDPOINTS.areas.eliminarArea + '/' + id
    );
  }
}
