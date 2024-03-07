import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeccionInterface } from '../../../informacion/interfaces/secciones-cabecera';

@Component({
  selector: 'app-secciones-cabecera',
  standalone: false,
  templateUrl: './secciones-cabecera.component.html',
  styleUrls: ['./secciones-cabecera.component.scss']
})
export class SeccionesCabeceraComponent implements OnInit {
  @Input() secciones: Array<SeccionInterface> = [];
  @Output() seleccionadoClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  seleccion(seccionClick: string): void {
    this.secciones.map((seccion: SeccionInterface) => {
      seccion.seleccionado = false;
      if (seccion.texto === seccionClick) {
        seccion.seleccionado = true;
        this.seleccionadoClick.emit(seccion.texto);
      }
    });
  }
}
