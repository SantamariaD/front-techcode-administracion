import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-documentos',
  templateUrl: './crear-documentos.component.html',
  styleUrls: ['./crear-documentos.component.scss'],
})
export class CrearDocumentosComponent implements OnInit {
  /**
   * @Output emite el evento cuando se da click en cerrar el modal de crear documento
   */
  @Output() cerrarModal = new EventEmitter<any>();

  /**
   * @Output emite el evento cuando se da click en cerrar el modal de crear documento
   */
  @Output() guardarDocumentoSolicitado = new EventEmitter<any>();

  /**
   * @Formulario guarda la información del documento que se solicitara a los empleados
   */
  solicitudDocumentoForm: FormGroup = new FormGroup({
    nombreDocumento: new FormControl('', [Validators.required]),
    especificaciones: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}
}
