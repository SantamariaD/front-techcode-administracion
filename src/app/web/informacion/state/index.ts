import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUsuario from './usuario/usuario.reducer';
import * as fromHttp from './cargandoPeticion/cargandoPeticion.reducer';
import * as fromAreas from './areas/areas.reducer';
import * as fromPuestos from './puestos/puestos.reducer';
import * as fromEmpleados from './empleados/empleados.reducer';
import * as fromSucursales from './sucursales/sucursales.reducer';
import * as fromBancos from './bancos/bancos.reducer';
import * as fromCarpetas from './/carpetas/carpetas.reducer';
import { UsuarioInterface, usuarioStore } from '../interface/usuario';
import { CargandoPeticionInterface } from '../interface/httpService';
import { Empleados, EmpleadosStore } from '../interface/empleados';
import { ConsultaSucursales } from '../interface/sucursales';
import { Banco } from '../interface/bancos';
import { ConsultaCarpetasDocumentos } from '../interface/carpetas';
import { Puesto } from '../interface/puesto';
import { Area } from '../interface/areas';

export interface AppState {
  usuario: usuarioStore;
  cargandoPeticion: CargandoPeticionInterface;
  areas: Array<Area>;
  puestos: Array<Puesto>;
  empleados: EmpleadosStore;
  sucursales: Array<ConsultaSucursales>;
  bancos: Banco[];
  carpetasDocumentos: ConsultaCarpetasDocumentos;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuario: fromUsuario.reducer,
  cargandoPeticion: fromHttp.reducer,
  areas: fromAreas.reducer,
  puestos: fromPuestos.reducer,
  empleados: fromEmpleados.reducer,
  sucursales: fromSucursales.reducer,
  bancos: fromBancos.reducer,
  carpetasDocumentos: fromCarpetas.reducer,
};

//*********SELECTORES******/

//***** Features selectores****/

// Spinn cargando
export const selectCargandoPeticion =
  createFeatureSelector<CargandoPeticionInterface>('cargandoPeticion');

// Login
export const selectLoginPeticion =
  createFeatureSelector<UsuarioInterface>('login');

//usuario
export const selectUsuarioPeticion =
  createFeatureSelector<usuarioStore>('usuario');

//Areas
export const selectAreas = createFeatureSelector<Array<Area>>('areas');

//Areas
export const selectPuestos = createFeatureSelector<Array<Puesto>>('puestos');

//Empleados
export const selectEmpleados =
  createFeatureSelector<EmpleadosStore>('empleados');

//Sucursales
export const selectSucursales =
  createFeatureSelector<Array<ConsultaSucursales>>('sucursales');

//Bancos
export const selectBancos = createFeatureSelector<Banco[]>('bancos');

//Carpetas
export const selectCarpetas =
  createFeatureSelector<ConsultaCarpetasDocumentos>('carpetasDocumentos');

//empleado login
export const selectEmpleadoLogin =
  createFeatureSelector<Empleados>('empleados');

//****** Creando selectores*****/
export const selectBanderaCargandoPeticion = createSelector(
  selectCargandoPeticion,
  (state: CargandoPeticionInterface) => state.cargandoPeticion
);

// Login
export const selectBanderaLoginPeticion = createSelector(
  selectLoginPeticion,
  (state: UsuarioInterface) => state.login
);

export const selectInfoUsuarioPeticion = createSelector(
  selectUsuarioPeticion,
  (state: usuarioStore) => state
);

// Areas
export const selectAreasGuardadas = createSelector(
  selectAreas,
  (state: Array<Area>) => state
);

// Puestos
export const selectPuestosGuardados = createSelector(
  selectPuestos,
  (state: Array<Puesto>) => state
);

// Empleados
export const selectEmpleadosStore = createSelector(
  selectEmpleados,
  (state: EmpleadosStore) => state
);

// Sucursale
export const selectSucursalesStore = createSelector(
  selectSucursales,
  (state: Array<ConsultaSucursales>) => state
);

// Banco
export const selectSelectBancosStore = createSelector(
  selectBancos,
  (state: Banco[]) => state
);

// Carpeta
export const selectSelectCarpetasStore = createSelector(
  selectCarpetas,
  (state: ConsultaCarpetasDocumentos) => state
);

// Empleado Login
export const selectEmpleadoLoginStore = createSelector(
  selectEmpleadoLogin,
  (state: any) => state.empleado
);
