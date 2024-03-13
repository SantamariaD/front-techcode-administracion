import { createAction, props } from '@ngrx/store';
import { Carpeta, ConsultaCarpetasDocumentos } from '../../interface/carpetas';
import { DocumentoCarpeta } from '../../interface/documentos';

const GUARDAR_CARPETAS_DOCUMENTOS =
  '[Carpetas] Guarda las carpetas y documentos de la aplicación';
const GUARDAR_CARPETAS = '[Carpetas] Guarda las carpetas de la aplicación';
const GUARDAR_DOCUMENTOS = '[Carpetas] Guarda los documentos de la aplicación';
const GUARDAR_DOCUMENTOS_ACTUALIZACION = '[Carpetas] Guarda la última actualización de documentos';

export const guardarCarpetasDocumentos = createAction(
  GUARDAR_CARPETAS_DOCUMENTOS,
  props<{ carpetasDocumentos: ConsultaCarpetasDocumentos }>()
);

export const guardarCarpetas = createAction(
  GUARDAR_CARPETAS,
  props<{ carpetas: Carpeta[] }>()
);

export const guardarDocumentos = createAction(
  GUARDAR_DOCUMENTOS,
  props<{ documentos: DocumentoCarpeta[] }>()
);

export const guardarActualizacion = createAction(
  GUARDAR_DOCUMENTOS_ACTUALIZACION,
  props<{ documento: DocumentoCarpeta }>()
);
