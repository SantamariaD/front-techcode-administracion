import { Action, createReducer, on } from '@ngrx/store';
import { Area } from '../../interface/areas';
import { guardarPuestos } from './puestos.actions';
import { Puesto } from '../../interface/puesto';

const estadoInicial: Array<Puesto> = [];

const puestosReducer = createReducer(
  estadoInicial,
  on(guardarPuestos, (state, { puestos }) => {
    state = puestos;
    return state;
  })
);

export function reducer(
  state: Array<Puesto> | undefined,
  action: Action
): Array<Puesto> {
  return puestosReducer(state, action);
}
