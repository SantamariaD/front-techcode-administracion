import { Action, createReducer, on } from '@ngrx/store';
import {
  peticionActivaAction,
  peticionInactivaAction,
} from './cargandoPeticion.actions';
import { CargandoPeticionInterface } from '../../interface/httpService';

const estadoInicial: CargandoPeticionInterface = {
  cargandoPeticion: false,
};

const cargandopeticionReducer = createReducer(
  estadoInicial,
  on(peticionActivaAction, (state) => {
    return {
      ...state,
      cargandoPeticion: true,
    };
  }),
  on(peticionInactivaAction, (state) => {
    return {
      ...state,
      cargandoPeticion: false,
    };
  })
);

export function reducer(
  state: CargandoPeticionInterface | undefined,
  action: Action
): CargandoPeticionInterface {
  return cargandopeticionReducer(state, action);
}
