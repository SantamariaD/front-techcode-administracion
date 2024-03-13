import { createAction, props } from '@ngrx/store';
import { Empleados } from '../../interface/empleados';
import { UsuarioInterface } from '../../interface/usuario';

const GUARDAR_USUARIO = '[Usuario] Guarda la información del usuario';
const BORRA_USUARIO = '[Usuario] borra la información del usuario';

const GUARDAR_EMPLEADO_SESION = '[Empleado] Guarda la información del empleado que inicia sesión';

export const guardarUsuario = createAction(
  GUARDAR_USUARIO,
  props<{ usuario: UsuarioInterface }>()
);

export const guardarEmpleadoSesion = createAction(
  GUARDAR_EMPLEADO_SESION,
  props<{ empleado: Empleados }>()
);