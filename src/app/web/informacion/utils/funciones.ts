import { ConsultaSucursales } from '../interface/sucursales';
import { desencriptacion } from './encriptacion';

export const formateoMoneda = (numeroInt: number): string => {
  const numero = numeroInt.toFixed(2);
  let formattedNumber;

  const parts = numero.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? '.' + parts[1] : '';

  formattedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (formattedNumber.includes('-'))
    formattedNumber = '-$' + formattedNumber.replace('-', '') + decimalPart;
  else formattedNumber = '$' + formattedNumber + decimalPart;

  return formattedNumber;
};

/**
 * @Metodo separa un numero enteros en comas de 3 en 3 y devuelve un string
 */
export const separarNumeroComas = (numeroInt: number) => {
  return numeroInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * @Metodo quita los simbolos y parse a un numero
 */
export const quitarMoneda = (datos: any) => {
  return datos.map((producto: any) => {
    if (
      typeof producto.precioVenta == 'string' &&
      typeof producto.precioCompra == 'string'
    ) {
      producto.precioCompra = producto.precioCompra
        .replace('$', '')
        .replace(',', '');
      producto.precioVenta = producto.precioVenta
        .replace('$', '')
        .replace(',', '');
    }

    return producto;
  });
};

/**
 * @Metodo verifica si el permiso que se ingresa lo tiene un empleado
 */
export const verificarPermisos = (permisosSistema: string[]): boolean => {
  const json = desencriptacion(localStorage.getItem('permisosSistema') || '');
  const rolesPermisos = JSON.parse(json || '{"prueba": "prueba"}');

  if (json) {
    return rolesPermisos.some((permiso: any) => {
      return permisosSistema.some(
        (permisoSistema) => permiso.nombrePermiso === permisoSistema
      );
    });
  } else {
    return false;
  }
};

/**
 * @Metodo realiza el calculo del total de almacenes
 */
/* export const calculoAlmacenes = (sucursales: ConsultaSucursales[]): number => {
  let totalAlmacenes = 0;
  sucursales.forEach((sucursal: ConsultaSucursales) => {
    sucursal.almacenes.forEach((almacen: Almacen) => totalAlmacenes++);
  });

  return totalAlmacenes;
};
 */