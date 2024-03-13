import { createAction, props } from '@ngrx/store';
import { Area } from '../../interface/areas';

const GUARDAR_AREAS = '[Áreas] Guarda las áreas de la aplicación';

export const guardarAreas = createAction(
  GUARDAR_AREAS,
  props<{ areas: Array<Area> }>()
);
