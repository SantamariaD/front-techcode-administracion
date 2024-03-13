import { InformacionFecha } from './httpService';

export interface CatalogoBancos extends InformacionFecha {
  id: number;
  nombre: string;
}
