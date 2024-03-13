import { UsuarioInterface } from "./usuario";


export interface LoginServiceInterface {
  token: string;
  usuario: UsuarioInterface;
}

export interface CerrarSesioninterface {
  message: string;
}
