import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DescragarArchivo,
  Documento,
} from '../../../informacion/interface/documentos';
import { HttpClientServiceInterface } from '../../../informacion/interface/httpService';
import { DocumentosService } from '../../../informacion/servicios/documentos/documentos.service';
import { desencriptacion } from '../../../informacion/utils/encriptacion';
import { ENDPOINTS } from '../../../informacion/utils/endpoint';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.scss'],
})
export class VisorPdfComponent implements OnInit {
  /**
   * @Input path: Path del documento de descarga
   */
  @Input() path: string = '';

  /**
   * @Output clickCerrar: Manda el evento click del boton cerrar
   */

  @Output() clickCerrar = new EventEmitter<boolean>();

  /**
   * @Variable nombrePdf: Contiene el nombre del pdf que se esta mostrando
   */
  nombrePdf = 'Archivo PDF';

  /**
   * @Variable porcentaje: Porcentaje del tamaño del pdf
   */
  porcentaje = '100%';

  /**
   * @Variable pathVisor: pathVisor del tamaño del pdf
   */
  pathVisor: any;

  /**
   * @Variable mostrarPdf: muestra el pdf cuando carga
   */
  mostrarPdf = false;

  /**
   * @Variable zoom: contiene el porcentaje del tamaño del zoom
   */
  zoom = 0.97;

  constructor(private documentosService: DocumentosService) {}

  ngOnInit(): void {
    this.pathVisor = {
      url: this.path,
      httpHeaders: {
        token: localStorage.getItem('token') || '',
        nombredb: desencriptacion(localStorage.getItem('uuidBD') || ''),
      },
    };
    setTimeout(() => (this.mostrarPdf = true), 3000);
  }

  /**
   * @Metodo cerrar modal
   */
  clickCerrarModal(): void {
    this.clickCerrar.emit(false);
  }

  /**
   * @Metodo agranda el pdf
   */
  clickMas(): void {
    switch (true) {
      case this.zoom == 0.9:
        this.zoom = 0.97;
        this.porcentaje = '100%';
        break;
      case this.zoom == 0.8:
        this.zoom = 0.9;
        this.porcentaje = '90%';
        break;
      case this.zoom == 0.65:
        this.zoom = 0.8;
        this.porcentaje = '80%';
        break;
      case this.zoom == 0.5:
        this.zoom = 0.65;
        this.porcentaje = '65%';
        break;
      case this.zoom == 0.3:
        this.zoom = 0.5;
        this.porcentaje = '50%';
        break;
      case this.zoom == 0.25:
        this.zoom = 0.3;
        this.porcentaje = '30%';
        break;
      case this.zoom == 0.97:
        this.zoom = 1.2;
        this.porcentaje = '120%';
        break;
      case this.zoom == 1.2:
        this.zoom = 1.5;
        this.porcentaje = '150%';
        break;
      case this.zoom == 1.5:
        this.zoom = 1.75;
        this.porcentaje = '175%';
        break;
      case this.zoom == 1.75:
        this.zoom = 2;
        this.porcentaje = '200%';
        break;
      default:
        break;
    }
  }

  /**
   * @Metodo hace más pequeño el pdf
   */
  clickMenos(): void {
    switch (true) {
      case this.zoom == 0.97:
        this.zoom = 0.9;
        this.porcentaje = '90%';
        break;
      case this.zoom == 0.9:
        this.zoom = 0.8;
        this.porcentaje = '80%';
        break;
      case this.zoom == 0.8:
        this.zoom = 0.65;
        this.porcentaje = '65%';
        break;
      case this.zoom == 0.65:
        this.zoom = 0.5;
        this.porcentaje = '50%';
        break;
      case this.zoom == 0.5:
        this.zoom = 0.3;
        this.porcentaje = '30%';
        break;
      case this.zoom == 0.3:
        this.zoom = 0.25;
        this.porcentaje = '25%';
        break;
      case this.zoom == 1.2:
        this.zoom = 0.97;
        this.porcentaje = '100%';
        break;
      case this.zoom == 1.5:
        this.zoom = 1.2;
        this.porcentaje = '120%';
        break;
      case this.zoom == 1.75:
        this.zoom = 1.5;
        this.porcentaje = '150%';
        break;
      case this.zoom == 2:
        this.zoom = 1.75;
        this.porcentaje = '175%';
        break;
      default:
        break;
    }
  }

  /**
   * @Metodo descarga el pdf
   */
  descargarPdf(): void {
    this.documentosService
      .descargarArchivoDocumento(
        this.path
          .replace(environment.urls.apiSistemaAdministrativo, '')
          .replace('-documento', '')
      )
      .subscribe({
        next: (
          archivoRespuesta: HttpClientServiceInterface<DescragarArchivo>
        ) => {
          const blob = new Blob(
            [this.base64ToArrayBuffer(archivoRespuesta.payload.base64)],
            {
              type: 'application/octet-stream',
            }
          );
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          document.body.appendChild(a);
          a.href = url;
          a.download = archivoRespuesta.payload.nombre;
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        error: (error) => console.log('error', error),
      });
  }

  /**
   * @Metodo convertir una cadena Base64 en un ArrayBuffer
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
