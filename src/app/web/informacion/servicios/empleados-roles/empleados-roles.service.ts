import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { Observable } from 'rxjs';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import {
  ConsultaEmpleadoRoles,
  EmpleadoRoles,
  Rol,
} from '../../interface/empleados-roles';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosRolesService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio consulta todos los productos de la base
   */
  consultarEmpleadoRoles(
    id: number
  ): Observable<HttpClientServiceInterface<ConsultaEmpleadoRoles>> {
    return this.http.get<HttpClientServiceInterface<ConsultaEmpleadoRoles>>(
      ENDPOINTS.empleadosRoles.consultar + '/' + id
    );
  }

  /**
   * @Servicio consulta todos los productos de la base
   */
  consultarRoles(): Observable<HttpClientServiceInterface<Rol[]>> {
    return this.http.get<HttpClientServiceInterface<Rol[]>>(
      ENDPOINTS.empleadosRoles.consultarRoles
    );
  }

  /**
   * @Servicio consulta todos roles de todos los empleados
   */
  consultarEmpleadosRoles(): Observable<
    HttpClientServiceInterface<EmpleadoRoles[]>
  > {
    return this.http.get<HttpClientServiceInterface<EmpleadoRoles[]>>(
      ENDPOINTS.empleadosRoles.consultarEmpleadosRoles
    );
  }

  /**
   * @Servicio guarda roles para un empleado
   */
  guardarEmpleadosRoles(
    empleadoRoles: any
  ): Observable<HttpClientServiceInterface<EmpleadoRoles[]>> {
    return this.http.post<HttpClientServiceInterface<EmpleadoRoles[]>>(
      ENDPOINTS.empleadosRoles.guardarEmpleadosRoles,
      empleadoRoles
    );
  }

  /**
   * @Servicio elimina roles de un empleado
   */ eliminarEmpleadosRoles(
    empleadoRoles: any
  ): Observable<HttpClientServiceInterface<EmpleadoRoles[]>> {
    return this.http.post<HttpClientServiceInterface<EmpleadoRoles[]>>(
      ENDPOINTS.empleadosRoles.eliminarEmpleadosRoles,
      empleadoRoles
    );
  }
}
