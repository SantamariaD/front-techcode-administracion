import { createAction, props } from '@ngrx/store';
import { ConsultaSucursales } from '../../interface/sucursales';

const GUARDAR_SUCURSALES =
  '[Sucursales] Guarda las sucursales de la aplicación';

export const guardarSucursales = createAction(
  GUARDAR_SUCURSALES,
  props<{ sucursales: Array<ConsultaSucursales> }>()
);
