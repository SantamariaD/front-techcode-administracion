import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataHorario } from '../../../../../../../../../../informacion/interface/horarios';
import { HorariosGeneralesService } from '../../../../../../../../../../informacion/servicios/horarios-generales/horarios-generales.service';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.scss'],
  providers: [DatePipe],
})
export class CrearHorarioComponent implements OnInit {
@Input() horario = {} as DataHorario;
@Output() cerrarCrearHorario = new EventEmitter<any>();

  hours : string[] = [];
  formHorario:FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('',[Validators.required]),
    horas: new FormControl(''),
    hora_entrada: new FormControl('0',[Validators.required,Validators.minLength(5)]),
    hora_salida : new FormControl('0',[Validators.required,Validators.minLength(5)])
  })


  constructor(private datePipe: DatePipe, private horariosGeneralesService:HorariosGeneralesService,private message: NzMessageService) { }

  ngOnInit(): void {
    if(this.horario){
      this.formHorario.patchValue({
        id: this.horario.id,
        nombre: this.horario.nombre,
        horas:this.horario.horas,
        hora_entrada: this.horario.hora_entrada,
        hora_salida: this.horario.hora_salida
      })
    }
    // Generar las opciones de hora en formato de 24 horas utilizando DatePipe
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = this.datePipe.transform(
        new Date(0, 0, 0, hour),
        'HH:mm'
      );
      if (formattedHour) this.hours.push(formattedHour);
    }
  }

  calculoHoras(){
    const horaEntrada = this.formHorario.value.hora_entrada; // Ejemplo de hora de entrada
const horaSalida = this.formHorario.value.hora_salida;  // Ejemplo de hora de salida

const horaEntradaDate = new Date(`1970-01-01T${horaEntrada}:00`);
const horaSalidaDate = new Date(`1970-01-01T${horaSalida}:00`);

const diferenciaMillisegundos = horaSalidaDate.getTime() - horaEntradaDate.getTime();

// Calcula la diferencia en horas y minutos
const diferenciaHoras = Math.floor(diferenciaMillisegundos / (1000 * 60 * 60));
const diferenciaMinutos = Math.floor((diferenciaMillisegundos % (1000 * 60 * 60)) / (1000 * 60));

console.log(`Diferencia: ${diferenciaHoras} horas y ${diferenciaMinutos} minutos`);
this.formHorario.patchValue({horas:`${diferenciaHoras}`})
  }

  slectHoras(){
    console.log(this.formHorario.value.hora_entrada, this.formHorario.value.hora_salida)
    if(this.formHorario.value.hora_entrada !== '0' || this.formHorario.value.hora_entrada !== '0'){
      this.calculoHoras();
    }
  }

  clickCerrarModal(){
this.cerrarCrearHorario.emit(false);
  }

  guardar(){
  this.formHorario.removeControl('id');
this.horariosGeneralesService.guardarHorario(this.formHorario.value).subscribe(response =>{
  if(response.mensaje === 'Horario Creado.'){
    this.message.create('success', `Se creo de manera correcta la nueva jornada`);
    this.cerrarCrearHorario.emit(1);
  }
 
})
  }

  editar(){
    this.horariosGeneralesService.actualizarHorario(this.formHorario.value).subscribe(response =>{
      if(response.mensaje === 'Horario actualizado.'){
        this.message.create('success', `Se actualizo de manera correcta la jornada`);
        this.cerrarCrearHorario.emit(1);
      }
    })
  }

}
