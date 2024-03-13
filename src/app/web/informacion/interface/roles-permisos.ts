import { InformacionFecha } from './httpService';

export interface RolPermiso extends InformacionFecha {
  id: number;
  nombre: string;
}

export interface EmpleadoRol extends InformacionFecha {
  id: number;
  idRol: number;
  idEmpleado: number;
  nombreRol: string;
}

export interface RolesPermisos extends InformacionFecha {
  id: number;
  idRol: number;
  idPermiso: number;
  nombreRol: string;
  nombrePermiso: string;
}

export interface ConsutaRolesPermisos {
  rolesPermisos: RolesPermisos[];
  roles: RolPermiso[];
  permisos: RolPermiso[];
}
