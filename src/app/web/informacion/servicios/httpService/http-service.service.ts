import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from '../../state/cargandoPeticion/cargandoPeticion.actions';
import { desencriptacion } from '../../utils/encriptacion';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  constructor(private http: HttpClient, private store: Store) {}

  post<T>(url: string, body?: any, headers?: any, spin = true): Observable<T> {
    if (spin) setTimeout(() => this.store.dispatch(peticionActivaAction()));
    const token = localStorage.getItem('token') as string;
    const uuidBD = desencriptacion(localStorage.getItem('uuidBD') as string);
    const headersRequest = new HttpHeaders({
      ...headers,
      token,
      nombredb: uuidBD,
    });

    return this.http
      .post<T>(environment.urls.apiSistemaAdministrativo + url, body || {}, {
        headers: headersRequest,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1500);
        })
      );
  }

  get<T>(url: string, spin = true, headers?: any): Observable<T> {
    if (spin) setTimeout(() => this.store.dispatch(peticionActivaAction()));
    const token = localStorage.getItem('token') as string;
    const uuidBD = desencriptacion(localStorage.getItem('uuidBD') as string);
    const headersRequest = new HttpHeaders({
      ...headers,
      token,
      nombredb: uuidBD,
    });

    return this.http
      .get<T>(environment.urls.apiSistemaAdministrativo + url, {
        headers: headersRequest,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1500);
        })
      );
  }

  put<T>(url: string, body?: any, spin = true, headers?: any): Observable<T> {
    if (spin) setTimeout(() => this.store.dispatch(peticionActivaAction()));
    const token = localStorage.getItem('token') as string;
    const uuidBD = desencriptacion(localStorage.getItem('uuidBD') as string);
    const headersRequest = new HttpHeaders({
      ...headers,
      token,
      nombredb: uuidBD,
    });

    return this.http
      .put<T>(environment.urls.apiSistemaAdministrativo + url, body || {}, {
        headers: headersRequest,
      })

      .pipe(
        finalize(() => {
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1500);
        })
      );
  }

  delete<T>(url: string, spin = true, headers?: any): Observable<T> {
    if (spin) setTimeout(() => this.store.dispatch(peticionActivaAction()));
    const token = localStorage.getItem('token') as string;
    const uuidBD = desencriptacion(localStorage.getItem('uuidBD') as string);
    const headersRequest = new HttpHeaders({
      ...headers,
      token,
      nombredb: uuidBD,
    });

    return this.http
      .delete<T>(environment.urls.apiSistemaAdministrativo + url, {
        headers: headersRequest,
      })

      .pipe(
        finalize(() => {
          setTimeout(() => {
            if (spin) this.store.dispatch(peticionInactivaAction());
          }, 1500);
        })
      );
  }
}
