import { InformacionFecha } from "./httpService";

export interface Area extends InformacionFecha {
    id: number;
    area: string;
    descripcion: string;
}