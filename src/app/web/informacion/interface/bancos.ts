import { InformacionFecha } from "./httpService";

export interface Banco extends InformacionFecha{
    id: number;
    nombre: string;
}