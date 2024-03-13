import { Empleados } from './empleados';

export interface UsuarioInterface {
  name: string;
  id: number;
  username: string;
  email: string;
  roles: InformacionRol[];
  login: boolean;
  uuidBD: string;
  confirmar_correo: boolean;
}

export interface UsuarioCrear {
  message: string;
  user: UsuarioInterface;
}

export interface usuarioStore {
  usuario: UsuarioInterface;
  empleadoSesion: Empleados;
}

export interface InformacionRol {
  rol: string;
  idRol: number;
}

export interface regitroUsuario {
  id_sucursal: number;
  name: string;
  email: string;
  password: string;
}
