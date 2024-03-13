import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import {
  ConsultaDocumentos,
  DescragarArchivo,
  Documento,
  RespuestaDocumetosConsulta,
} from '../../interface/documentos';
import { ENDPOINTS } from '../../utils/endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  constructor(private http: HttpclientService) {}

  // Método para traer documentos
  traerDocumentos(): Observable<
    HttpClientServiceInterface<RespuestaDocumetosConsulta>
  > {
    return this.http.get<
      HttpClientServiceInterface<RespuestaDocumetosConsulta>
    >(ENDPOINTS.documentos.traerTodosDocumentos);
  }

  // Método para guardar un documento
  guardarDocumento(
    documentos: any
  ): Observable<HttpClientServiceInterface<ConsultaDocumentos>> {
    return this.http.post<HttpClientServiceInterface<ConsultaDocumentos>>(
      ENDPOINTS.documentos.guardarDocumentos,
      documentos
    );
  }

  // Método para actualizar el archivo de un documento
  actualizarArchivoDocumento(
    documento: any
  ): Observable<HttpClientServiceInterface<Documento>> {
    return this.http.post<HttpClientServiceInterface<Documento>>(
      ENDPOINTS.documentos.actualizarDocumento,
      documento
    );
  }

  // Método para actualizar la informacion de un documento
  actualizarInfoDocumento(
    documento: any,
    spin = false
  ): Observable<HttpClientServiceInterface<ConsultaDocumentos>> {
    return this.http.put<HttpClientServiceInterface<ConsultaDocumentos>>(
      ENDPOINTS.documentos.actualizarNombreDocumento,
      documento,
      spin
    );
  }

  // Método eliminar un documento
  eliminarDocumento(
    id: number
  ): Observable<HttpClientServiceInterface<ConsultaDocumentos>> {
    return this.http.delete<HttpClientServiceInterface<ConsultaDocumentos>>(
      ENDPOINTS.documentos.eliminaDocumento + '/' + id
    );
  }

  // Método para actualizar el archivo de un documento DescragarArchivo
  descargarArchivoDocumento(
    path: any
  ): Observable<HttpClientServiceInterface<DescragarArchivo>> {
    return this.http.get<HttpClientServiceInterface<DescragarArchivo>>(path);
  }
}
