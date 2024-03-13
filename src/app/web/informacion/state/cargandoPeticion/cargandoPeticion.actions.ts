import { createAction, props } from '@ngrx/store';

const PETICION_ACTIVA =
  '[Cargando petición] Activa la bandera de cargar de petición';
const PETICION_INACTIVA =
  '[Cargando petición] Inactiva la bandera de cargar de petición';

export const peticionActivaAction = createAction(PETICION_ACTIVA);

export const peticionInactivaAction = createAction(PETICION_INACTIVA);
