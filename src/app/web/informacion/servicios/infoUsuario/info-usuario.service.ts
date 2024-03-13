import { Injectable } from '@angular/core';
import {
  UsuarioInterface,
} from '../../interface/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientServiceInterface } from '../../interface/httpService';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(
    private httpClient: HttpClient,
  ) {}


traerUsuarioById(id:number,
  ): Observable<
HttpClientServiceInterface<UsuarioInterface>
> {
  const urlBase = environment.urls.apiAutenticacion;
   const url = '/traer-usuario';
return this.httpClient.get<HttpClientServiceInterface<UsuarioInterface>>(
  urlBase + url + '/' + id
);
}

  actualizarUsuario(
    usuario: any,
  ): Observable<HttpClientServiceInterface<UsuarioInterface[]>> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/actualizar-usuario';
    return this.httpClient.post<HttpClientServiceInterface<UsuarioInterface[]>>(
      urlBase + url,usuario
    );
  }
  
  eliminarUsuario(id:number,
    ):Observable<HttpClientServiceInterface<UsuarioInterface[]>> {
      const urlBase = environment.urls.apiAutenticacion;
      const url = '/eliminar-usuario';
    return this.httpClient.delete<HttpClientServiceInterface<UsuarioInterface[]>>(
      urlBase + url + '/' + id
    );{} 
  }
}
