import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Documento, PlantillaDocumento } from '../../interface/documentos';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class PlantillaService {
  constructor(private http: HttpclientService) {}

  traerPlantillas(): Observable<
    HttpClientServiceInterface<PlantillaDocumento[]>
  > {
    return this.http.get<HttpClientServiceInterface<PlantillaDocumento[]>>(
      ENDPOINTS.plantillas.consultarPlantillas
    );
  }

  crearPlantilla(
    data: any
  ): Observable<HttpClientServiceInterface<PlantillaDocumento[]>> {
    return this.http.post<HttpClientServiceInterface<PlantillaDocumento[]>>(
      ENDPOINTS.plantillas.crearPlantilla,
      data
    );
  }

  actualizarPlantilla(
    data: any
  ): Observable<HttpClientServiceInterface<PlantillaDocumento[]>> {
    return this.http.put<HttpClientServiceInterface<PlantillaDocumento[]>>(
      ENDPOINTS.plantillas.atualizarPlantillas,
      data
    );
  }
}
