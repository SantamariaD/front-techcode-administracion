import { Action, createReducer, on } from '@ngrx/store';
import { ConsultaSucursales } from '../../interface/sucursales';
import { guardarSucursales } from './sucursales.actions';

const estadoInicial: Array<ConsultaSucursales> = [];

const sucursalesReducer = createReducer(
  estadoInicial,
  on(guardarSucursales, (state, { sucursales }) => {
    state = sucursales;
    return state;
  })
);

export function reducer(
  state: Array<ConsultaSucursales> | undefined,
  action: Action
): Array<ConsultaSucursales> {
  return sucursalesReducer(state, action);
}
