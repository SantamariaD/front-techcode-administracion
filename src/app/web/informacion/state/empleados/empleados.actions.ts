import { createAction, props } from '@ngrx/store';
import { Area } from '../../interface/areas';
import { Empleados } from '../../interface/empleados';
import { Documento } from '../../interface/documentos';

const GUARDAR_EMPLEADOS = '[Empledos] Guarda los empleados de la aplicación';
const GUARDAR_EMPLEADO_LOGIN =
  '[Empledos] Guarda la información de un empleado al hace login';
const GUARDAR_DOCUMENTOS_EMPLEADOS =
  '[DOCUMENTO] Guarda los documentos de los empleados de toda la aplicación';
const GUARDAR_EMPLEADO_SELECCIONADO =
  '[Empleados] Guarda el empleado seleccionado de la lista';
const BORRAR_EMPLEADO_SELECCIONADO =
  '[Empleados] Borra el empleado seleccionado del state';

export const guardarEmpleados = createAction(
  GUARDAR_EMPLEADOS,
  props<{ empleados: Array<Empleados> }>()
);

export const guardarEmpleadoSeleccionado = createAction(
  GUARDAR_EMPLEADO_SELECCIONADO,
  props<{ empleado: Empleados }>()
);

export const borrarEmpleadoSeleccionado = createAction(
  BORRAR_EMPLEADO_SELECCIONADO,
  props<{ empleado: {} }>()
);

export const guardarDocumentos = createAction(
  GUARDAR_DOCUMENTOS_EMPLEADOS,
  props<{ documentos: Documento[] }>()
);

export const guardarEmpleadoLogin = createAction(
  GUARDAR_EMPLEADO_LOGIN,
  props<{ empleado: Empleados }>()
);
