export const environment = {
  version: '1.0.0',
  production: true,
  urls: {
    apiSistemaAdministrativo: 'https://api-sistema-administrativo.techcode.tech/api',
    apiAutenticacion: 'https://api-autenticacion.techcode.tech/api',
  },
  modulosAplicacion: {
    puntoVenta: true,
    proveedores: true,
    empleados: true,
    almacenCompra: true,
    sucursales: true,
  },
  encriptacion: {
    llave: 'b2fe5d7819426bf708ad1341a8f873c61d3832519fbc8c5b7f839e37ed8d6fa7',
    iv:'abcdefghijklmnop',
    encrypt: false
  }
};