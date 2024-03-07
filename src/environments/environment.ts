// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  version: '1.0.0',
  production: false,
  urls: {
    apiSistemaAdministrativo: 'http://localhost:8003/api',
    apiAutenticacion: 'http://localhost:8001/api',
  },
  modulosAplicacion: {
    puntoVenta: true,
    proveedores: true,
    empleados: true,
    nominas:true,
    almacenCompra: true,
    sucursales: true,
  },
  encriptacion: {
    llave: '12345678901234567890123456789012',
    iv:'abcdefghijklmnop',
    encrypt: false
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
