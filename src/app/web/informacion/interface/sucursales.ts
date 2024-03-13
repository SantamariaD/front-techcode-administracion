import { InformacionFecha } from './httpService';

export interface ConsultaSucursales extends InformacionFecha {
  id: number;
  idEncargado: number;
  nombreSucursal: string;
  telefono: string;
  correo: string;
  horarioAtencion: string;
  domicilio: string;
  nombreEncargado:string;
  apellidoPaternoEncargado:string;
  apellidoMaternoEncargado:string;
}