import { Action, createReducer, on } from '@ngrx/store';
import { ConsultaCarpetasDocumentos } from '../../interface/carpetas';
import { guardarActualizacion, guardarCarpetas, guardarCarpetasDocumentos, guardarDocumentos } from './carpetas.actions';

const estadoInicial: ConsultaCarpetasDocumentos =
  {} as ConsultaCarpetasDocumentos;

const carpetasReducer = createReducer(
  estadoInicial,
  on(guardarCarpetasDocumentos, (state, { carpetasDocumentos }) => {
    return {
      ...state,
      ...carpetasDocumentos,
    };
  }),
  on(guardarCarpetas, (state, { carpetas }) => {
    return {
      ...state,
      carpetas,
    };
  }),
  on(guardarDocumentos, (state, { documentos }) => {
    return {
      ...state,
      documentos,
    };
  })
  ,
  on(guardarActualizacion, (state, { documento }) => {
    return {
      ...state,
      ultimaActualizacion: documento,
    };
  })
);

export function reducer(
  state: ConsultaCarpetasDocumentos | undefined,
  action: Action
): ConsultaCarpetasDocumentos {
  return carpetasReducer(state, action);
}
