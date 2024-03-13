import { createAction, props } from '@ngrx/store';
import { Banco } from '../../interface/bancos';

const GUARDAR_BANCOS = '[Bancos] Guarda los bancos de la aplicación';

export const guardarBancos = createAction(
    GUARDAR_BANCOS,
  props<{ bancos: Array<Banco> }>()
);