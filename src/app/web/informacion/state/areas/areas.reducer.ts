import { Action, createReducer, on } from '@ngrx/store';
import { Area } from '../../interface/areas';
import { guardarAreas } from './areas.actions';

const estadoInicial: Array<Area> = [];

const areasReducer = createReducer(
  estadoInicial,
  on(guardarAreas, (state, { areas }) => {
    state = areas;
    return state;
  })
);

export function reducer(
  state: Array<Area> | undefined,
  action: Action
): Array<Area> {
  return areasReducer(state, action);
}
