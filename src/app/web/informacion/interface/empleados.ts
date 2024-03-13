import { Documento } from './documentos';
import { DataHorario } from './horarios';
import { ReporteEpleado } from './nominas';
import { EmpleadoRol } from './roles-permisos';

export interface Empleados {
  id: number;
  id_user: number;
  nombres: string;
  archivoImagen: any;
  apellido_paterno: string;
  apellido_materno: string;
  nombreCompleto: string;
  nombrePuesto: string;
  nombreArea: string;
  nombreSucursal: string;
  fecha_nacimiento: string;
  genero: string;
  estado_civil: string;
  curp: string;
  rfc: string;
  nss: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  puesto: string;
  area_id: number;
  puesto_id: number;
  sucursal_id: number;
  departamento: string;
  fecha_inicio: string;
  salario: string;
  horas_laborales: number;
  horario: string;
  horaro: DataHorario[];
  reportes: ReporteEpleado[];
  reporte: ReporteEpleado;
  impuesto: string;
  seguro: string;
  fechaSinReporte: string[];
  imagen: string;
  extension: string;
  tipoContrato: string;
  fechaAlta: string;
  fechaBaja: string;
  baja: boolean;
  asistencia?: boolean;
  fecha_reingreso: string;
  calle: string;
  numeroExt: string;
  numeroInt: string;
  colonia: string;
  codigoPostal: string;
  delegacion: string;
  ciudad: string;
  referencias: string;
  descripcion: string;
  clabeInterbancaria: string;
  nombreBancoClabe: string;
  idJefeInmediato: number;
  nombreJefeInmediato: string;
  apellidoPaternoJefeInmediato: string;
  apellidoMaternoJefeInmediato: string;
  idCatalogoBanco: number;
  periodoPago: string;
  roles: EmpleadoRol[];
}

export interface EmpleadosStore {
  empleados: Array<Empleados>;
  empleadoSeleccionado: Empleados;
  documentos: Documento[];
  empleadoLogin: Empleados;
}

export interface RegistroAsistencias {
  id: number;
  id_emp: number;
  estatus: string;
  hora_entrada: string;
  hora_salida: string;
  horas:string;
  fecha: string;
}
