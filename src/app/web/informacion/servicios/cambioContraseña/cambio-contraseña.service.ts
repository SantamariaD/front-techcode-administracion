import { Injectable } from '@angular/core';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { HttpclientService } from '../httpService/http-service.service';
import { Store } from '@ngrx/store';
import { AppState, selectInfoUsuarioPeticion } from '../../state';
import { IndexableObject } from 'ng-zorro-antd/core/types';
import { UsuarioInterface, usuarioStore } from '../../interface/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from '../../state/cargandoPeticion/cargandoPeticion.actions';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CambioContraseñaService {
  id!: number;
  contra!: string;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  actualizaContrasena(request: any) {
    setTimeout(() => this.store.dispatch(peticionActivaAction()));
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/actualizar-contrasena';
    return this.http.post<any>(urlBase + url, request).pipe(
      finalize(() => {
        setTimeout(() => this.store.dispatch(peticionInactivaAction()), 1000);
      })
    );
  }

  verificarCredenciales(request: any){
    setTimeout(() => this.store.dispatch(peticionActivaAction()));
    const urlBase = environment.urls.apiAutenticacion;
    const url = '/verificar-contrasena';
    return this.http.post<any>(urlBase + url, request).pipe(
      finalize(() => {
        setTimeout(() => this.store.dispatch(peticionInactivaAction()), 1000);
      })
    );
  }
}
