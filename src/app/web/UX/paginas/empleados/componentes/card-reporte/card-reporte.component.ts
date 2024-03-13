import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Empleados, RegistroAsistencias } from '../../../../../informacion/interface/empleados';
import { DataHorario, DiaSemana } from '../../../../../informacion/interface/horarios';
import { EmpleadosService } from '../../../../../informacion/servicios/empleados/empleados.service';
import { HorariosService } from '../../../../../informacion/servicios/horarios/horarios.service';
import { ReportesEmpleadoService } from '../../../../../informacion/servicios/reportes-empleado/reportes-empleado.service';

@Component({
  selector: 'app-card-reporte',
  templateUrl: './card-reporte.component.html',
  styleUrls: ['./card-reporte.component.scss']
})
export class CardReporteComponent implements OnInit {

   /**
   * @Input mostrarModal: Trae la respuesta de la tabla de empleados para abrir el modal de crear
   */
   @Input() mostrarModal = false;

   /**
    * @Input mostrarModal: Trae la respuesta de la tabla de empleados para abrir el modal de crear
    */
   @Input() empleado: Empleados = {} as Empleados;
 
   /**
    * @input fechaSeleccionada:Fecha que se pasa para su modificación.
    */
   @Input() fechaSeleccionada: DiaSemana = {} as DiaSemana;

   /**
   * @Output cerrarModal: envia el boleano para cerrar el modal de crear empleados
   */
  @Output() cerrarModal = new EventEmitter<any>();

  @Input() currentDate:Date = new Date()

  nominaForm:FormGroup= new FormGroup({
    id: new FormControl(''),
    id_empleado: new FormControl(''),
    id_horario: new FormControl(''),
    id_registro: new FormControl(''),
    fecha: new FormControl(''),
    sueldo_dia: new FormControl(''),
    otros_ganancia: new FormControl(''),
    hora_extra: new FormControl(''),
    comisiones: new FormControl(''),
    total_ganancia: new FormControl(''),
    hora_descontada: new FormControl(''),
    adelantos: new FormControl(''),
    otros_descuento: new FormControl(''),
    total_descuento: new FormControl(''),
    total: new FormControl(''),
    comentarios: new FormControl('')
  })

  sinHorario = false;

  sinRegistro = false;

  horario:DataHorario = {} as DataHorario;

  registroAsistencia:RegistroAsistencias = {} as RegistroAsistencias;

  sueldo ='';

  horasExtra = 0;

  comisiones= 0;

  otrosGanancias = 0;

  totalGanancias = 0;

  horasDescontadas = 0;

  adelantos= 0;

  otrosDescuentos = 0;

  totalDescuentos = 0;

  total = 0;
 

  constructor(private horarioService:HorariosService, private empleadoService:EmpleadosService, private reporteService:ReportesEmpleadoService) { }

  ngOnInit(): void {
   const fechaFraccionada = this.fechaSeleccionada.fecha.split('-');
   
   const mes = parseFloat(fechaFraccionada[1]);
   const anio = parseFloat(fechaFraccionada[2]);
    this.traerHorario();
    this.traerAsistencia();
    if(this.empleado.reporte){
      console.log(this.empleado.reporte)
      this.nominaForm.patchValue({
        total_ganancia : this.empleado.reporte.total_ganancia,
      id_empleado: this.empleado.id,
      fecha:this.fechaSeleccionada.fecha,
      sueldo_dia:this.empleado.reporte.sueldo_dia,
      total_descuento: this.empleado.reporte.total_descuento,
      id: this.empleado.reporte.id,
    id_horario: this.empleado.reporte.id_horario,
    id_registro: this.empleado.reporte.id_registro,
    otros_ganancia: this.empleado.reporte.otros_ganancia,
    hora_extra: this.empleado.reporte.hora_extra,
    comisiones: this.empleado.reporte.comisiones,
    hora_descontada: this.empleado.reporte.hora_descontada,
    adelantos: this.empleado.reporte.adelantos,
    otros_descuento: this.empleado.reporte.otros_descuento,
    total: this.empleado.reporte.total,
    comentarios: this.empleado.reporte.comentarios
      })
    const sueldo = this.calcularSalarioDiario(this.empleado.salario);
    this.sueldo = sueldo.toString();
    this.total = parseFloat(this.empleado.reporte.total);
    this.totalGanancias =  parseFloat(this.empleado.reporte.total_ganancia);
    this.totalDescuentos =  parseFloat(this.empleado.reporte.total_descuento);
    this.verificarYCambiarValores();
    }else{
      console.log('sin')
    const sueldo =this.calcularSalarioDiario(this.empleado.salario);
    this.sueldo = sueldo.toString();

    this.nominaForm.patchValue({
      total_ganancia : this.calcularSalarioDiario(this.empleado.salario),
      id_empleado: this.empleado.id,
      fecha:this.fechaSeleccionada.fecha,
      sueldo_dia:this.sueldo,
      total:this.sueldo,
      total_descuento:'0'
    });
    this.totalGanancias = sueldo;
    this.total = this.totalGanancias - this.totalDescuentos;
  }
  
  }

   calcularSalarioDiario(salario:string) {
    const fechaActual = new Date();
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
    const salarioDiario = parseFloat(salario) / ultimoDiaMes;
   console.log('salario',salario, 'ultimoDia',ultimoDiaMes)
    return salarioDiario;
  }

  verificarYCambiarValores() {
    const formControls = this.nominaForm.controls;

    // Itera sobre los controles del formulario
    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName)) {
        const control = formControls[controlName];

        // Verifica si el valor es null
        if (control.value === null) {
          // Cambia el valor a lo que desees, por ejemplo, una cadena vacía ('')
          control.setValue('');
        }
      }
    }
  }

  guardarReporte(){
console.log(this.horasExtra);
  }


  cerrar(valor?:number) {
    if(valor === 1){
     const data = { 
        ocultar:false,
       modalExito:true
      }
      this.cerrarModal.emit(data);
    }else if(valor === 2){
      const data = { 
        ocultar:false,
       modalExito:false
      }
      this.cerrarModal.emit(data);
    }else{
      this.cerrarModal.emit(false);
      this.mostrarModal = false;
    }
    
  }

  traerHorario(){
    this.horarioService.traeHorarioByfecha(this.fechaSeleccionada.fecha,this.empleado.id).subscribe(response =>{
      if(response.mensaje === 'No se encontrarón resultados'){
        this.sinHorario = true;
      }else{
 this.horario = response.payload[0]; 
 console.log(this.horario);
 this.nominaForm.patchValue({
  id_horario: this.horario.id
 });
      }
      
      console.log(response);   
    })
  }

  traerAsistencia(){
this.empleadoService.traerRegistro(this.empleado.id,this.formatFechaAsistencia(this.fechaSeleccionada.fecha)).subscribe(response =>{
  if(response.error === 'El registro no se encontro.'){
    this.sinRegistro = true;
  }else{
    console.log('dddd')
this.registroAsistencia = response.payload; 
this.nominaForm.patchValue({
  id_registro: this.registroAsistencia.id,

 })
 this.registroAsistencia = response.payload
  }
})
  }

  formatFechaAsistencia(fecha:string){
const fechaSeccinada = fecha.split('-');
const formatFecha = fechaSeccinada[0] + fechaSeccinada[1] +fechaSeccinada[2]
return formatFecha
  }

  cambiaValor(){
    console.log(this.nominaForm.value.hora_extra);
    this.nominaForm.value.hora_extra = this.nominaForm.value.hora_extra.replace('$', '')
    this.nominaForm.value.comisiones = this.nominaForm.value.comisiones.replace('$', '');
    this.nominaForm.value.otros_ganancia =  this.nominaForm.value.otros_ganancia.replace('$', '');
    if(this.nominaForm.value.otros_ganancia.length === 0 || this.nominaForm.value.otros_ganancia === '$' || this.nominaForm.value.otros_ganancia === '.00'){
      this.otrosGanancias = 0
    }else{
      this.otrosGanancias = parseFloat(this.nominaForm.value.otros_ganancia);
    };
    if(this.nominaForm.value.hora_extra.length === 0 || this.nominaForm.value.hora_extra === '$' || this.nominaForm.value.hora_extra === '.00'){
      this.horasExtra = 0
    }else{
      this.horasExtra = parseFloat(this.nominaForm.value.hora_extra);
    };
    if(this.nominaForm.value.comisiones.length === 0 || this.nominaForm.value.comisiones === '$' || this.nominaForm.value.comisiones === '.00'){
      this.comisiones = 0
    }else{
      this.comisiones = parseFloat(this.nominaForm.value.comisiones);
    };
    
    
   this.totalGanancias =   this.horasExtra + this.comisiones + this.otrosGanancias + parseFloat(this.sueldo);
   
   this.total =  this.totalGanancias - this.totalDescuentos;
   this.nominaForm.patchValue({
    total_ganancia:  this.totalGanancias.toString(),
    total : this.total.toString()
        }) 
  }

  cambiaValorDescuentos(){
    console.log(this.nominaForm.value.adelantos,this.nominaForm.value.hora_descontada,this.nominaForm.value.otros_descuento)
    this.nominaForm.value.adelantos = this.nominaForm.value.adelantos.replace('$', '')
    this.nominaForm.value.hora_descontada = this.nominaForm.value.hora_descontada.replace('$', '');
    this.nominaForm.value.otros_descuento =  this.nominaForm.value.otros_descuento.replace('$', '');
    if(this.nominaForm.value.otros_descuento.length === 0 || this.nominaForm.value.otros_descuento === '$' || this.nominaForm.value.otros_descuento === '.00'){
      this.otrosDescuentos = 0
    }else{
      this.otrosDescuentos = parseFloat(this.nominaForm.value.otros_descuento);
    };
    if(this.nominaForm.value.adelantos.length === 0 || this.nominaForm.value.adelantos === '$' || this.nominaForm.value.adelantos === '.00'){
      this.adelantos = 0
    }else{
      this.adelantos = parseFloat(this.nominaForm.value.adelantos);
    };
    if(this.nominaForm.value.hora_descontada.length === 0 || this.nominaForm.value.hora_descontada === '$' || this.nominaForm.value.hora_descontada === '.00'){
      this.horasDescontadas = 0
    }else{
      this.horasDescontadas = parseFloat(this.nominaForm.value.hora_descontada);
    };

    this.totalDescuentos = this.adelantos + this.otrosDescuentos + this.horasDescontadas;
    
    this.total =  this.totalGanancias - this.totalDescuentos;

    this.nominaForm.patchValue({
      total_descuento: this.totalDescuentos.toString(),
      total : this.total.toString()
          }) 
  }

  guardarNomina(){
    this.nominaForm.value.adelantos = this.nominaForm.value.adelantos.replace('$', '')
    this.nominaForm.value.hora_descontada = this.nominaForm.value.hora_descontada.replace('$', '');
    this.nominaForm.value.otros_descuento =  this.nominaForm.value.otros_descuento.replace('$', '');
    this.nominaForm.value.hora_extra = this.nominaForm.value.hora_extra.replace('$', '');
    this.nominaForm.value.comisiones = this.nominaForm.value.comisiones.replace('$', '');
    this.nominaForm.value.otros_ganancia =  this.nominaForm.value.otros_ganancia.replace('$', '');
    console.log(this.nominaForm.value);
    this.reporteService.guardarReporte(this.nominaForm.value).subscribe(response =>{
      if(response.codigo === 200){
        this.cerrar(1);
      }else{
        this.cerrar(2);
      }
    })
    
  }

  actualizarrNomina(){
    this.nominaForm.value.adelantos = this.nominaForm.value.adelantos.replace('$', '')
    this.nominaForm.value.hora_descontada = this.nominaForm.value.hora_descontada.replace('$', '');
    this.nominaForm.value.otros_descuento =  this.nominaForm.value.otros_descuento.replace('$', '');
    this.nominaForm.value.hora_extra = this.nominaForm.value.hora_extra.replace('$', '')
    this.nominaForm.value.comisiones = this.nominaForm.value.comisiones.replace('$', '');
    this.nominaForm.value.otros_ganancia =  this.nominaForm.value.otros_ganancia.replace('$', '');
    this.reporteService.actualizarReporte(this.nominaForm.value).subscribe(response =>{
      if(response.codigo === 200){
        this.cerrar(1);
      }else{
        this.cerrar(2);
      }
    })
  }

  traerUltimoDiaMes(anio:number,mes:number):number{
  // Crear una nueva fecha con el primer día del mes siguiente
  const siguenteMes = new Date(anio, mes + 1, 1);

  // Restar un día para obtener el último día del mes actual
  const ultimoDiaMes = new Date(siguenteMes.getTime() - 1);
        const newday = String(ultimoDiaMes.getDate()).padStart(2, '0');
  const fechaFormateada = `${newday}`;
  return parseFloat(fechaFormateada); 
}

}
