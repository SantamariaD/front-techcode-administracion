export interface DataHorario {
    id?: number;
  idEmpleado?: number;
  idHorGeneral?:number;
  fecha?: string;
  nombre: string;
  horas: string;
  hora_entrada: string;
  hora_salida: string;
  baja?:number;
}

export interface DiaSemana {
  nombre: string;
  fecha: string;
}

export interface Periodo{
  fecha: string;
}
