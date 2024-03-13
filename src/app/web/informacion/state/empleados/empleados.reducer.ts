import { Action, createReducer, on } from '@ngrx/store';
import { Empleados, EmpleadosStore } from '../../interface/empleados';
import {
  guardarEmpleados,
  guardarEmpleadoSeleccionado,
  guardarDocumentos,
  borrarEmpleadoSeleccionado,
  guardarEmpleadoLogin,
} from './empleados.actions';

const estadoInicial: EmpleadosStore = {} as EmpleadosStore;

const empleadosReducer = createReducer(
  estadoInicial,
  on(guardarEmpleados, (state, { empleados }) => {
    return {
      ...state,
      empleados,
    };
  }),

  on(guardarEmpleadoSeleccionado, (state, { empleado }) => {
    return {
      ...state,
      empleadoSeleccionado: empleado,
    };
  }),

  on(borrarEmpleadoSeleccionado, (state) => {
    return {
      ...state,
      empleadoSeleccionado: {} as Empleados,
    };
  }),

  on(guardarDocumentos, (state, { documentos }) => {
    return {
      ...state,
      documentos,
    };
  }),

  on(guardarEmpleadoLogin, (state, { empleado }) => {
    return {
      ...state,
      empleado,
    };
  })
);

export function reducer(
  state: EmpleadosStore | undefined,
  action: Action
): EmpleadosStore {
  return empleadosReducer(state, action);
}
