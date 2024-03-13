import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { CatalogoBancos } from '../../interface/catalogo-bancos';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class CatalogoBancosService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Consulta el catálogo de bancos
   */
  consultarCatalogoBancos(): Observable<
    HttpClientServiceInterface<CatalogoBancos[]>
  > {
    return this.http.get<HttpClientServiceInterface<CatalogoBancos[]>>(
      ENDPOINTS.catalogoBancos.consultar
    );
  }
}
