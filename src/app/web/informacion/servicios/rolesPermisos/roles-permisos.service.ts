import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';
import { ConsutaRolesPermisos } from '../../interface/roles-permisos';

@Injectable({
  providedIn: 'root',
})
export class RolesPermisosService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio Consulta los roles y permisos que se tienen
   */
  consultar(): Observable<HttpClientServiceInterface<ConsutaRolesPermisos>> {
    return this.http.get<HttpClientServiceInterface<ConsutaRolesPermisos>>(
      ENDPOINTS.rolesPermisos.consultar
    );
  }

  /**
   * @Servicio Guarda un nuevo rol
   */
  guardar(
    request: any
  ): Observable<HttpClientServiceInterface<ConsutaRolesPermisos>> {
    return this.http.post<HttpClientServiceInterface<ConsutaRolesPermisos>>(
      ENDPOINTS.rolesPermisos.guardar,
      request
    );
  }

  /**
   * @Servicio Actualiza un nuevo rol
   */
  actualizarRol(
    request: any
  ): Observable<HttpClientServiceInterface<ConsutaRolesPermisos>> {
    return this.http.put<HttpClientServiceInterface<ConsutaRolesPermisos>>(
      ENDPOINTS.rolesPermisos.actualizar,
      request
    );
  }

  /**
   * @Servicio Elimina un nuevo rol
   */
  eliminarRol(
    id: number
  ): Observable<HttpClientServiceInterface<ConsutaRolesPermisos>> {
    return this.http.delete<HttpClientServiceInterface<ConsutaRolesPermisos>>(
      ENDPOINTS.rolesPermisos.eliminar + '/' + id
    );
  }

  /**
   * @Servicio Guarda un rol con uno o varios permisos
   */
  guardarRolPermisos(
    request: any
  ): Observable<HttpClientServiceInterface<ConsutaRolesPermisos>> {
    return this.http.post<HttpClientServiceInterface<ConsutaRolesPermisos>>(
      ENDPOINTS.rolesPermisos.guardarRolPermisos,
      request
    );
  }

  /**
   * @Servicio Elimina un rol con uno o varios permisos
   */
  eliminarRolPermisos(
    request: any
  ): Observable<HttpClientServiceInterface<ConsutaRolesPermisos>> {
    return this.http.post<HttpClientServiceInterface<ConsutaRolesPermisos>>(
      ENDPOINTS.rolesPermisos.eliminarRolPermisos,
      request
    );
  }
}
