import { createAction, props } from '@ngrx/store';
import { Puesto } from '../../interface/puesto';

const GUARDAR_PUESTOS = '[Puestos] Guarda los puestos de la aplicacion';

export const guardarPuestos = createAction(
    GUARDAR_PUESTOS,
  props<{ puestos: Array<Puesto> }>()
);
