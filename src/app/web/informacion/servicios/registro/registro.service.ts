import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioCrear, regitroUsuario } from '../../interface/usuario';
import { HttpClientServiceInterface, HttpClientServiceInterfaceNoPayload } from '../../interface/httpService';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(
    private httpClient: HttpClient
  ) { }

  altaUsuario(
    data: regitroUsuario
  ): Observable<HttpClientServiceInterface<UsuarioCrear>> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/registrar-usuario-empleado';
    return this.httpClient.post<HttpClientServiceInterface<UsuarioCrear>>(
      urlBase + url,
      data
    );
  }

  eliminarUsuario(
    id: number
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/eliminar-usuario';
    return this.httpClient.delete<HttpClientServiceInterfaceNoPayload>(
      urlBase + url + '/' + id
    );
  }
}
