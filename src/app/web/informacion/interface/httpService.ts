export interface HttpClientServiceInterface<T> {
  codigo: number;
  mensaje: string;
  error?: any
  payload: T;
}

export interface HttpClientServiceInterfaceNoPayload {
  codigo: number;
  mensaje: string;
  error?: any
}


export interface CargandoPeticionInterface {
  cargandoPeticion: boolean;
}

export interface InformacionFecha {
  created_at?: any;
  updated_at?: any;
}
