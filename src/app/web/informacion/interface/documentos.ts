import { InformacionFecha } from './httpService';

export type TiposArchivo =
  | 'pdf'
  | 'word'
  | 'excel'
  | 'power'
  | 'zip'
  | 'file'
  | 'imagen';

export interface Documento extends InformacionFecha {
  id: number;
  id_area: number;
  id_user?: number;
  id_emp?: number;
  nombre_archivo?: string;
  especificaciones?: string;
  uuid: string;
  area?: string;
  extension: string;
  activo?: number;
  file0?: any;
  nombreUsuario?: string;
  comentarios: string;
  estatus: string;
}

export interface DocumentoCarpeta extends InformacionFecha {
  id: number;
  id_user: number;
  id_carpeta: number;
  nombre_archivo: string;
  especificaciones?: string;
  uuid: string;
  extension: string;
  path: string;
  activo?: number;
  file0?: any;
  nombreUsuario?: string;
}

export interface RespuestaDocumetosConsulta {
  payload?: Array<Documento>;
  documentos: Array<Documento>;
  ultimaActualizacion: Documento;
}

export interface ConsultaDocumentos {
  documentos: Array<DocumentoCarpeta>;
  ultimaActualizacion: DocumentoCarpeta;
}

export interface DescragarArchivo {
  base64: string;
  nombre: string;
}

export interface PlantillaDocumento {
  id: number;
  nombreDocumento: string;
  especificaciones: string;
}

export interface ConsultaPlantillaDocumentoEmpleado extends InformacionFecha {
  id: number;
  idEmpleado: number;
  idPlantillaDocumento: number;
  uuid: string;
  extension: string;
  activo: number;
  estatus: string;
  comentarios: string;
  nombreDocumento: string;
  especificaciones: string;
}
