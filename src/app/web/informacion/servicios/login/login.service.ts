import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { HttpClientServiceInterface } from 'src/app/web/informacion/interface/httpService';
import {
  CerrarSesioninterface,
  LoginServiceInterface,
} from 'src/app/web/informacion/interface/login';
import { environment } from 'src/environments/environment';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from '../../state/cargandoPeticion/cargandoPeticion.actions';
import { HttpclientService } from '../httpService/http-service.service';
import { desencriptacion, encriptacion } from '../../utils/encriptacion';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  login(
    correo: string,
    contrasena: string
  ): Observable<HttpClientServiceInterface<LoginServiceInterface>> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/autenticacion/login';
    this.store.dispatch(peticionActivaAction());

    return this.httpClient
      .post<HttpClientServiceInterface<LoginServiceInterface>>(urlBase + url, {
        email: correo,
        password: contrasena,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => this.store.dispatch(peticionInactivaAction()), 3000);
        })
      );
  }

  cerrarSesionService(): Observable<CerrarSesioninterface> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/autenticacion/logout';
    const token = localStorage.getItem('token') || '';
    this.store.dispatch(peticionActivaAction());

    return this.httpClient
      .post<CerrarSesioninterface>(
        urlBase + url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        finalize(() => {
          setTimeout(() => this.store.dispatch(peticionInactivaAction()), 1000);
        })
      );
  }

  cambiarContrasena(
    correo: string
  ): Observable<HttpClientServiceInterface<any>> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/recuperar-contrasena';
    this.store.dispatch(peticionActivaAction());

    return this.httpClient
      .post<HttpClientServiceInterface<any>>(urlBase + url, {
        email: correo,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => this.store.dispatch(peticionInactivaAction()), 1000);
        })
      );
  }

  confirmarCambioContrasena(
    id: any
  ): Observable<HttpClientServiceInterface<any>> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/confirmar-cambio-contrasena/' + id;
    this.store.dispatch(peticionActivaAction());

    return this.httpClient
      .get<HttpClientServiceInterface<any>>(urlBase + url)
      .pipe(
        finalize(() => {
          setTimeout(() => this.store.dispatch(peticionInactivaAction()), 1000);
        })
      );
  }

  actualizarCambioContrasena(
    form: any
  ): Observable<HttpClientServiceInterface<any>> {
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/actualizar-cambio-contrasena';
    this.store.dispatch(peticionActivaAction());

    return this.httpClient
      .post<HttpClientServiceInterface<any>>(urlBase + url, form)
      .pipe(
        finalize(() => {
          setTimeout(() => this.store.dispatch(peticionInactivaAction()), 1000);
        })
      );
  }
}
