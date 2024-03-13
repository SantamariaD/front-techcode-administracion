import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ConsultaSucursales } from '../../interface/sucursales';
import { ENDPOINTS } from '../../utils/endpoint';

@Injectable({
  providedIn: 'root',
})
export class SucursalesService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio consulta las sucursales
   */
  consultarSucursales(
    spin = false
  ): Observable<HttpClientServiceInterface<ConsultaSucursales[]>> {
    return this.http.get<HttpClientServiceInterface<ConsultaSucursales[]>>(
      ENDPOINTS.sucursales.consultarSucursales,
      true
    );
  }

  /**
   * @Servicio actualiza una sucursal
   */
  actualizarSucursal(
    sucursal: any
  ): Observable<HttpClientServiceInterface<ConsultaSucursales[]>> {
    return this.http.put<HttpClientServiceInterface<ConsultaSucursales[]>>(
      ENDPOINTS.sucursales.actualizarScursal,
      sucursal
    );
  }

  /**
   * @Servicio actualiza una sucursal
   */
  guardarSucursal(
    sucursal: any
  ): Observable<HttpClientServiceInterface<ConsultaSucursales[]>> {
    return this.http.post<HttpClientServiceInterface<ConsultaSucursales[]>>(
      ENDPOINTS.sucursales.crearScursal,
      sucursal
    );
  }

  /**
   * @Servicio elimina una sucursal
   */
  eliminarSucursal(
    idSucursal: any
  ): Observable<HttpClientServiceInterface<ConsultaSucursales[]>> {
    return this.http.delete<HttpClientServiceInterface<ConsultaSucursales[]>>(
      ENDPOINTS.sucursales.eliminarScursal + '/' + idSucursal
    );
  }

  /**
   * @Servicio agrega un almacén a una sucursal
   */
  agregarAlmacen(
    almacen: any
  ): Observable<HttpClientServiceInterface<ConsultaSucursales[]>> {
    return this.http.post<HttpClientServiceInterface<ConsultaSucursales[]>>(
      ENDPOINTS.sucursales.agregarAlmacen,
      almacen
    );
  }
}
