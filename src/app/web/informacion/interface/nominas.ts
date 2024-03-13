export  interface ReporteEpleado{
    id:number;
    id_empleado:number;
    fecha:string;
    id_horario:number;
    id_registro:number;
    sueldo_dia:string;
    hora_extra:string;
    comisiones:string;
    otros_ganancia:string;
    total_ganancia:string;
    hora_descontada:string;
    adelantos:string;
    otros_descuento:string;
    total_descuento:string;
    comentarios:string;
    total:string;
}

export interface DesgloceNomina{
    id:number;
    id_empleado:number;
id_nomina:number;
fecha?:string;
    sueldo_base:string;
    hora_extra:string;
    comisiones:string;
    otros_ganancia:string;
    total_ganancia:string;
    hora_descontada:string;
    adelantos:string;
    otros_descuento:string;
    total_descuento:string;
    impuesto:string;
    seguro:string;
    total:string;
    periodo:string;
    comentarios:string;
    impuestoTemporal?:string;
    seguroTemporal?:string;
}

export interface Desgloce{
    sueldo_base:number;
    hora_extra:number;
    comisiones:number;
    otros_ganancia:number;
    total_ganancia:number;
    hora_descontada:number;
    adelantos:number;
    otros_descuento:number;
    total_descuento:number;
    impuesto:number;
    seguro:number;
    total:number;
}

export interface NominaGlobal{
    id:number;
    id_nomina:number;
    id_empleado:number;
    periodo:string;
    sueldo_base:string;
    hora_extra:string;
    comisiones:string;
    otros_ganancia:string;
    total_ganancia:string;
    hora_descontada:string;
    adelantos:string;
    otros_descuento:string;
    total_descuento:string;
    impuesto:string;
    seguro:string;
    total:string;
    comentarios:string;
    fecha?:string;
    impuestoTemporal?:string;
    seguroTemporal?:string;
}

export interface NominaGlobalEmpleado{
    id:number;
    id_nomina:number;
    id_empleado:number;
    periodo:string;
    sueldo_base:string;
    hora_extra:string;
    comisiones:string;
    otros_ganancia:string;
    total_ganancia:string;
    hora_descontada:string;
    adelantos:string;
    otros_descuento:string;
    total_descuento:string;
    impuesto:string;
    seguro:string;
    total:string;
    comentarios:string;
    fecha?:string;
    impuestoTemporal?:string;
    seguroTemporal?:string;
}

export interface EmpleadoSinReporte{
    nombre:string;
    fecha:string;
}