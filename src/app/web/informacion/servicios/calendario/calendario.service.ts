import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import {
  HttpClientServiceInterface,
  HttpClientServiceInterfaceNoPayload,
} from '../../interface/httpService';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../utils/endpoint';
import { CalendarioGuardar, CalendarioRespuesta } from '../../interface/calendario';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  constructor(private http: HttpclientService) {}

  /**
   * @Servicio trae el calendario de un usuario
   */
  traerCalendarioUsuario(
    ano: number,
    idUsuario: string
  ): Observable<HttpClientServiceInterface<any>> {
    return this.http.get<HttpClientServiceInterface<any>>(
      ENDPOINTS.calendario.consultarCalendarioUsuario +
        '/' +
        ano +
        '/' +
        idUsuario
    );
  }

   /**
   * @Servicio trae el calendario de un usuario
   */
   traerCalendarioid(
    idUsuario: string
  ): Observable<HttpClientServiceInterface<any>> {
    return this.http.get<HttpClientServiceInterface<any>>(
      ENDPOINTS.calendario.consultarCalendarioid +
        '/' +
        idUsuario
    );
  }

  /**
   * @Servicio trae el calendario de un usuario
   */
  eliminarEventoCalendario(
    id: number
  ): Observable<HttpClientServiceInterfaceNoPayload> {
    return this.http.delete<HttpClientServiceInterfaceNoPayload>(
      ENDPOINTS.calendario.eliminarEventoCalendario + '/' + id
    );
  }

  /**
   * @Servicio crea un evento al calendario
   */
  crearEventoCalendario(
    evento: CalendarioGuardar
  ): Observable<HttpClientServiceInterface<CalendarioRespuesta>> {
    return this.http.post<HttpClientServiceInterface<CalendarioRespuesta>>(
      ENDPOINTS.calendario.crearEventoCalendario,
      evento
    );
  }

  /**
   * @Servicio crea varios eventos a la vez al calendario
   */
  crearVariosEventos(
    eventos: any
  ): Observable<HttpClientServiceInterface<CalendarioRespuesta>> {
    return this.http.post<HttpClientServiceInterface<CalendarioRespuesta>>(
      ENDPOINTS.calendario.crearVariosEventos,
      eventos
    );
  }

  /**
   * @Servicio crea varios eventos a la vez al calendario
   */
  editarVariosEventos(
    eventos: any
  ): Observable<HttpClientServiceInterface<CalendarioRespuesta>> {
    return this.http.post<HttpClientServiceInterface<CalendarioRespuesta>>(
      ENDPOINTS.calendario.editarVariosEventos,
      eventos
    );
  }
}
