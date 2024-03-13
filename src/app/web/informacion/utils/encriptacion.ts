import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(environment.encriptacion.llave);
const iv = CryptoJS.enc.Utf8.parse(environment.encriptacion.iv);

export const encriptacion = (dato: string): string =>
  CryptoJS.AES.encrypt(dato, key, {
    iv: iv,
  }).toString();

export const desencriptacion = (dato: string): string =>
  CryptoJS.AES.decrypt(dato, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
