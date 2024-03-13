import { Action, createReducer, on } from '@ngrx/store';
import { Banco } from '../../interface/bancos';
import { guardarBancos } from './bancos.actions';

const estadoInicial: Array<Banco> = [];

const bancosReducer = createReducer(
  estadoInicial,
  on(guardarBancos, (state, { bancos }) => {
    state = bancos;
    return state;
  })
);

export function reducer(
  state: Array<Banco> | undefined,
  action: Action
): Array<Banco> {
  return bancosReducer(state, action);
}
