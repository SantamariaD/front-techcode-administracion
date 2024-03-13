import { environment } from '../../../../environments/environment';

export const ENDPOINTS = {
  documentos: {
    traerDocumentosArea: '/documentos/traer-documentos-area/administracion',
    traerTodosDocumentos: '/documentos/traer-documentos',
    guardarDocumentos: '/documentos/guardar-documento',
    actualizarDocumento: '/documentos/actualizar-documento',
    actualizarNombreDocumento: '/documentos/actualizar-nombre',
    eliminaDocumento: '/documentos/borrar-documento',
    descargarDocumento: '/documentos/descargar-documento',
  },
  productos: {
    consultarProductos: '/producto/consultar-productos',
    consultarProductosVenta: '/producto/consultar-productos-venta',
    consultarProductosNoVenta: '/producto/consultar-productos-no-venta',
    consultarProducto: '/producto/consultar-producto',
    importarProductos: '/producto/importar-productos',
    guardarProductos: '/producto/guardar-producto',
    actualizarProductos: '/producto/actualizar-producto',
    descargarFormato: '/producto/descargar-formato',
    eliminarProductos: '/producto/eliminar-producto',
  },
  productosTicket: {
    consultarProductosTicket: '/productosTicket/consultar-productos-ticket',
    consultarProductosTicketId: '/productosTicket/consultar',
  },
  categorias: {
    consultarCategorias: '/categorias/consultar-categorias',
    crearCategorias: '/categorias/guardar-categoria',
    eliminarCategorias: '/categorias/eliminar-categoria',
  },
  categoriasVentas: {
    consultarCategorias: '/categorias-productos-almacenes/consultar-categorias',
    crearCategorias: '/categorias-productos-almacenes/guardar-categoria',
    eliminarCategorias: '/categorias-productos-almacenes/eliminar-categoria',
  },
  empleados: {
    crearEmpleado:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/guardar-empleado',
    crearEmpleadoLaboral:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/guardar-empleado-laboral',
    traerEmpleados:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/consultar-empleados',
    traerEmpleado:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/consultar-empleado',
    traerFotografia:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/traer-fotografia',
    guardarEmpleado:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/guardar-empleado',
    actualizarEmpleado:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/actualizar-empleado',
    actualizarEmpleadoLaboral:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/actualizar-empleado-laboral',
    eliminarEmpleado:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/eliminar-empleado',
    traerDocumentosArea:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/traer-documentos-area/administracion',
    traerTodosDocumentos:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/consultar-plantillas-documentos-empleado',
    eliminarDocumento:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/desasignar-plantilla-documento-empleado',
    guardarDocumentos:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/asignar-plantilla-documento',
    actualizarDocumento:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/actualizar-plantilla-documento-empleado',
    descargarDocumento:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/descargar-documento',
    guardarAsistencia:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/guardar-asistencia',
    actualizarAsistencia:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/actualizar-asistencia',
    traerRegistro:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados/traer-registro',
  },
  plantillas: {
    crearPlantilla:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/plantillas/crear-plantilla',
    consultarPlantillas:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/plantillas/consultar-plantillas',
    eliminarPlantillas:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/plantillas/eliminar-plantilla',
    atualizarPlantillas:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/plantillas/actualizar-plantilla',
  },
  horarios: {
    crearHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/crear-horario',
    crearVariosHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/crear-varios',
    actualizarHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/actualizar-horario',
    actualizarVariosHorarios:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/actualizar-varios',
    ConsultarHorarioByEmpleado:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/consultar-horario',
    ConsultarHorarioByfecha:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/consultar-horario-fecha',
    ConsultarHorarios:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/consultar-horarios',
    eliminarHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horario/eliminar-horario',
  },
  horariosGenerales: {
    crearHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horarios-generales/crear-horario',
    actualizarHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horarios-generales/actualizar-horario',
    ConsultarHorarioById:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horarios-generales/consultar-horario',
    ConsultarHorarios:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horarios-generales/consultar-horarios',
    eliminarHorario:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/horarios-generales/eliminar-horario',
  },
  reportes: {
    crearReporte: '/reportes/crear-reporte',
    actualizarReporte: '/reportes/actualizar-reporte',
    ConsultarReporteByEmpleado: '/reportes/consultar-reportes',
    ConsultarReporteByfecha: '/reportes/consultar-reporte-fecha',
    ConsultarReporteByIdNomina: '/reportes/consultar-reportes-idNomina',
    ConsultarReportes: '/reportes/consultar-reportes',
    ConsultarVariosFecha: '/reportes/consultar-varios-fecha',
    ConsultarVariosIdNomina: '/reportes/consultar-varios-idNomina',
    eliminarReporte: '/reportes/eliminar-horario',
  },
  nominas: {
    crearNominaGlobal: '/nominas/crear-nomina-general',
    editarNominaGlobal: '/nominas/actualizar-nomina-general',
    crearNominaEmpleado: '/nominas/crear-nomina-empleado',
    editarNominaEmpleado: '/nominas/actualizar-nomina-empleado',
    consultarNominasEmpleado: '/nominas/consultar-nomina-empleado',
    consultarNominasGlobal: '/nominas/consultar-nomina-global',
    ConsultarNominaEmpleadoById: '/nominas/consultar-nomina-empleadoById',
    ConsultarNominaEmpleadoByPeriodo:
      '/nominas/consultar-nomina-empleadoByPeriodo',
  },
  perfil: {
    traerUsuarioById: '/traer-usuario',
    actualizarUsuario: '/actualizar-usuario',
    eliminarUsuario: '/eliminar-usuario',
  },
  proveedores: {
    consultarProveedores: '/proveedores/consultar-proveedores',
    consultarProveedor: '/proveedores/consultar-proveedor',
    guardarProveedor: '/proveedores/guardar-proveedor',
    actualizarProveedor: '/proveedores/actualizar-proveedor',
    eliminarProveedor: '/proveedores/eliminar-proveedor',
  },
  catalogoProveedores: {
    consultarCatalogos: '/catalogo-proveedores/consultar-catalogos',
    consultarCatalogo: '/catalogo-proveedores/consultar-catalogo',
    consultarCatalogoProducto:
      '/catalogo-proveedores/consultar-catalogo-producto',
    guardarCatalogo: '/catalogo-proveedores/guardar-catalogo',
    actualizarCatalogo: '/catalogo-proveedores/actualizar-catalogo',
    eliminarCatalogo: '/catalogo-proveedores/eliminar-catalogo',
  },
  areas: {
    crearArea:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/areas/crear-area',
    actualizarArea:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/areas/actualizar-area',
    consultarAreas:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/areas/consultar-areas',
    eliminarArea:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/areas/eliminar-area',
  },
  puestos: {
    crearPuesto:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/puestos/crear-puesto',
    actualizarPuesto:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/puestos/actualizar-puesto',
    consultarPuestos:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/puestos/consultar-puestos',
    consultarPuestoByArea:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/puestos/consultar-puestoByArea',
    eliminarPuesto:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/puestos/eliminar-puesto',
  },
  ordenCompra: {
    guardarOrdenCompra: '/ordenes-compra/guardar-orden-compra',
    actualizarOrdenCompra: '/ordenes-compra/actualizar-orden-compra',
    consultarOrdenesCompra: '/ordenes-compra/consultar-orden-compra',
  },
  productosOrdenCompra: {
    guardarOrdenCompra:
      '/productos-ordenes-compra/guardar-producto-orden-compra',
  },
  calendario: {
    consultarCalendarioUsuario: '/calendario/consultar-calendario-usuario',
    consultarCalendarioid: '/calendario/consultar-calendario-id',
    eliminarEventoCalendario: '/calendario/eliminar-evento-calendario',
    crearEventoCalendario: '/calendario/crear-evento-calendario',
    crearVariosEventos: '/calendario/crear-varios',
    editarVariosEventos: '/calendario/editar-varios-eventos',
  },
  sucursales: {
    consultarSucursales:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/sucursales/consultar-sucursales',
    eliminarScursal:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/sucursales/eliminar-sucursal',
    crearScursal:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/sucursales/crear-sucursal',
    actualizarScursal:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/sucursales/actualizar-sucursal',
    agregarAlmacen:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/sucursales/agregar-almacen-sucursal',
    actualizarAlmacen:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/sucursales/actualizar-almacen-sucursal',
  },
  stockVentas: {
    guardarProducto: '/stock-ventas/guardar-producto',
    actualizarProducto: '/stock-ventas/actualizar-producto',
    eliminarProducto: '/stock-ventas/eliminar-producto',
    consultarProductosFiltrados: '/stock-ventas/consultar-productos-filtrados',
    consultarProductos: '/stock-ventas/consultar-productos',
  },
  productosAlmacenes: {
    consultarProductos: '/productos-almacenes/consultar-productos',
    consultarProductosVenta: '/productos-almacenes/consultar-productos-venta',
    crearProducto: '/productos-almacenes/crear-producto',
    importarProductos: '/productos-almacenes/importar-productos',
    actualizarProducto: '/productos-almacenes/actualizar-producto',
    consultarInformacion:
      '/productos-almacenes/consultar-informacion-productos-almacenes',
  },
  almacenes: {
    consultarAlmacenes: '/almacenes/consultar-almacenes',
    guardarAlmacenes: '/almacenes/guardar-almacen',
    actualizarAlmacenes: '/almacenes/actualizar-almacen',
  },
  catalogoBancos: {
    consultar:
      environment.urls.msTechcodeAdministracionGestionOrganizacional +
      '/catalogo-bancos/consultar',
  },
  ticket: {
    guardar: '/tickets/guardar',
    consultarTickets: '/tickets/consultar',
    imprimir: 'http://127.0.0.1:8000/api/impresoras/imprimir-ticket',
    imprimirCorte: 'http://127.0.0.1:8000/api/impresoras/imprimir-corte',
    imprimirInicio: 'http://127.0.0.1:8000/api/impresoras/imprimir-inicio',
    consultar: 'http://127.0.0.1:8000/api/impresoras/consultar-impresoras',
  },
  caja: {
    consultarCaja: '/caja/consultar-caja',
    iniciarCaja: '/caja/iniciar-caja',
    corteCaja: '/caja/corte-caja',
    guardarIngresoRetiroCaja: '/caja/guardar-ingreso-retiro-caja',
    guardarCaja: '/caja/guardar-caja',
    actualizarCaja: '/caja/actualizar-caja',
    consultarIngresoRetiroCaja: '/caja/consultar-ingreso-retiro-caja',
    consultarOtrosIniciosCaja: '/caja/consultar-otros-inicios-caja',
    consultarCajasNoIiniciadas: '/caja/consultar-cajas-no-iniciadas',
  },
  carpetas: {
    consultarCarpetas: '/carpetas/consultar',
    actualizarCarpeta: '/carpetas/actualizar',
    guardarCarpeta: '/carpetas/guardar',
    eliminarCarpeta: '/carpetas/eliminar',
  },
  analisis: {
    ventasMes: '/analisis/ventas-anio',
    ventasDiarias: '/analisis/ventas-mes',
    informacionVentas: '/analisis/ventas-informacion',
    comprasAnio: '/analisis/compras-anio',
    comprasMes: '/analisis/compras-mes',
    comprasInformacion: '/analisis/compras-informacion',
  },
  clientes: {
    traerTodos: '/clientes/consultar-clientes',
    traerCliente: '/clientes/traer-cliente',
    crearCliente: '/clientes/guardar-cliente',
    actualizarCliente: '/clientes/editar-cliente',
  },
  rolesPermisos: {
    consultar: '/roles-permisos/consultar',
    guardar: '/roles-permisos/guardar-rol',
    actualizar: '/roles-permisos/actualizar-rol',
    eliminar: '/roles-permisos/eliminar-rol',
    guardarRolPermisos: '/roles-permisos/guardar-rol-permisos',
    eliminarRolPermisos: '/roles-permisos/eliminar-rol-permisos',
  },
  empleadosRoles: {
    consultar:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados-roles/consultar',
    consultarRoles:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados-roles/consultar-roles',
    consultarEmpleadosRoles:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados-roles/consultar-empleados-roles',
    guardarEmpleadosRoles:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados-roles/guardar',
    eliminarEmpleadosRoles:
      environment.urls.msTechcodeAdministracionEmpleados +
      '/empleados-roles/eliminar',
  },
  almacenesProductosEntradas: {
    consultarEntradas: '/productos-entradas/consultar-entradas',
    guardarEntradas: '/productos-entradas/guardar-entrada',
    informacionEntradas: '/productos-entradas/consultar-informacion-entradas',
  },
  almacenesProductosSalidas: {
    consultarSalidas: '/productos-salidas/consultar-salidas',
    guardarSalidas: '/productos-salidas/guardar-salida',
    informacionSalidas: '/productos-salidas/consultar-informacion-salidas',
  },
  almacenesProductosTraspasos: {
    consultarTraspasos: '/almacenes-sucursal-traspasos/consultar-traspasos',
    guardarTraspaso: '/almacenes-sucursal-traspasos/guardar-traspaso',
    actualizarTraspaso: '/almacenes-sucursal-traspasos/actualizar-traspaso',
  },
  caducidades: {
    consultarCaducidades: '/productos-caducidades/consultar-caducidades',
    guardarCaducidades: '/productos-caducidades/guardar-caducidades',
    actualizarCaducidades: '/productos-caducidades/actualizar-caducidades',
    informacionCaducidades:
      '/productos-caducidades/consultar-informacion-caducidades',
  },
  caducidadesAlmacenCompras: {
    consultarCaducidades: '/almacen-compras-caducidades/consultar-caducidades',
    informacionCaducidades:
      '/almacen-compras-caducidades/consultar-informacion-caducidades',
    guardarCaducidades: '/almacen-compras-caducidades/guardar-caducidades',
    actualizarCaducidades:
      '/almacen-compras-caducidades/actualizar-caducidades',
  },
  traspasosAlmacenCompras: {
    consultarTraspasos: '/almacen-compras-traspasos/consultar-traspasos',
    guardarTraspaso: '/almacen-compras-traspasos/guardar-traspaso',
    actualizarTraspaso: '/almacen-compras-traspasos/actualizar-traspaso',
  },
  almacenComprasEntradas: {
    consultarEntradas: '/almacen-compras-entradas/consultar-entradas',
    guardarEntradas: '/almacen-compras-entradas/guardar-entrada',
    informacionEntradas:
      '/almacen-compras-entradas/consultar-informacion-entradas',
  },
  almacenComprasSalidas: {
    consultarSalidas: '/almacen-compras-salidas/consultar-salidas',
    guardarSalidas: '/almacen-compras-salidas/guardar-salida',
    informacionSalidas:
      '/almacen-compras-salidas/consultar-informacion-salidas',
  },
  ordenesCompraEstatus: {
    consultarEvaluaciones: '/orden-compras-evaluacion/consultar-evaluaciones',
    guardarEvaluacion: '/orden-compras-evaluacion/guardar-evaluacion',
  },
  compras: {
    consultarCompras: '/compras/consultar-compras',
    guardarCompras: '/compras/guardar-compra',
  },
  almacenesSucursalTraspasosEvaluacion: {
    almacenesSucursalTraspasosEvaluacionConsultar:
      '/almacenes-sucursal-traspasos-evaluacion/consultar-evaluacion',
    almacenesSucursalTraspasosEvaluacionGuardar:
      '/almacenes-sucursal-traspasos-evaluacion/guardar-evaluacion',
  },
  almacenComprasTraspasosEvaluacion: {
    almacenesSucursalTraspasosEvaluacionConsultar:
      '/almacen-compras-traspasos-evaluacion/consultar-evaluacion',
    almacenesSucursalTraspasosEvaluacionGuardar:
      '/almacen-compras-traspasos-evaluacion/guardar-evaluacion',
  },
};
