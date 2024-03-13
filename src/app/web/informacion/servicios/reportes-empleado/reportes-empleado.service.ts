import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpService/http-service.service';
import { HttpClientServiceInterface } from '../../interface/httpService';
import { ENDPOINTS } from '../../utils/endpoint';
import { Observable } from 'rxjs';
import { ReporteEpleado } from '../../interface/nominas';

@Injectable({
  providedIn: 'root'
})
export class ReportesEmpleadoService {

  constructor(private http:HttpclientService) { }

  guardarReporte(
    dataReporte: ReporteEpleado,
  ): Observable<HttpClientServiceInterface<ReporteEpleado[]>> {
    return this.http.post<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.crearReporte,
      dataReporte
    );
  }

  actualizarReporte(
    dataReporte: ReporteEpleado,
  ): Observable<HttpClientServiceInterface<ReporteEpleado[]>> {
    return this.http.post<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.actualizarReporte,
      dataReporte
    );
  }

  traeReportesById(idEmpleado:number): Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.get<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.ConsultarReporteByEmpleado + '/' + idEmpleado
    );
  }

  traerReporteByfecha(fecha:string,idEmpleado:number): Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.get<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.ConsultarReporteByfecha+ '/' + fecha + '/' + idEmpleado
    );
  }

  traerReportes(): Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.get<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.ConsultarReportes
    );
  }

  traerReportesIdNomina(idNomina:number): Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.get<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.ConsultarReporteByIdNomina+ '/' + idNomina
    );
  }

  traerVariosFecha(data:any): Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.post<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.ConsultarVariosFecha,data
    );
  }

  traerVariosIdNomina(data:any): Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.post<HttpClientServiceInterface<ReporteEpleado[]>>(
      ENDPOINTS.reportes.ConsultarVariosIdNomina,data
    );
  }

  eliminarReporte(id:number):Observable<HttpClientServiceInterface<ReporteEpleado[]>>{
    return this.http.delete<HttpClientServiceInterface<ReporteEpleado[]>>(ENDPOINTS.reportes.eliminarReporte + '/' + id)
  }
}
