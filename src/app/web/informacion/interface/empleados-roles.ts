import { InformacionFecha } from './httpService';
import { RolPermiso } from './roles-permisos';

export interface EmpleadoRoles extends InformacionFecha {
  id: number;
  idEmpleado: number;
  idRol: number;
  nombreRol: string;
}

export interface EmpleadoRolesGuardad {
  idEmpleado: number;
  idRol: number;
}

export interface ConsultaEmpleadoRoles {
  roles: EmpleadoRoles[];
  permisos: RolPermiso[];
  idEmpleado: number;
  idSucursal: number;
  baja?: boolean;
}

export interface Rol extends InformacionFecha {
  id: number;
  nombre: string;
}
