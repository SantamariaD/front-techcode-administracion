import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Carpeta, ConsultaCarpetasDocumentos } from '../../interface/carpetas';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class CarpetasService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Consulta de todas las carpetas de documentos
   */
  consultarCarpetasDocumentos(): Observable<
    HttpClientServiceInterface<ConsultaCarpetasDocumentos>
  > {
    return this.http.get<
      HttpClientServiceInterface<ConsultaCarpetasDocumentos>
    >(ENDPOINTS.carpetas.consultarCarpetas);
  }

  /**
   * @Servicio Actualiza la información de una carpeta
   */
  actualizarCarpetaDocumentos(
    carpeta: any,
    spin = false
  ): Observable<HttpClientServiceInterface<Carpeta[]>> {
    return this.http.put<HttpClientServiceInterface<Carpeta[]>>(
      ENDPOINTS.carpetas.actualizarCarpeta,
      carpeta,
      spin
    );
  }

  /**
   * @Servicio GUarda una carpeta nueva en la BD
   */
  guardadrCarpetaNueva(
    carpeta: any
  ): Observable<HttpClientServiceInterface<Carpeta[]>> {
    return this.http.post<HttpClientServiceInterface<Carpeta[]>>(
      ENDPOINTS.carpetas.guardarCarpeta,
      carpeta
    );
  }

  /**
   * @Servicio GUarda una carpeta nueva en la BD
   */
  eliminarCarpeta(
    id: number
  ): Observable<HttpClientServiceInterface<Carpeta[]>> {
    return this.http.delete<HttpClientServiceInterface<Carpeta[]>>(
      ENDPOINTS.carpetas.eliminarCarpeta + '/' + id
    );
  }
}
