import { Documento, DocumentoCarpeta } from './documentos';
import { InformacionFecha } from './httpService';

export interface Carpeta extends InformacionFecha {
  id: number;
  idCarpetaPadre: number;
  nombre: string;
  documentos: Documento[];
}

export interface ConsultaCarpetasDocumentos {
  carpetas: Carpeta[];
  documentos: Array<DocumentoCarpeta>;
  ultimaActualizacion: DocumentoCarpeta;
}
