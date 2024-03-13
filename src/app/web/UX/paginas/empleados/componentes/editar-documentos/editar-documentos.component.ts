import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillaDocumento } from '../../../../../informacion/interface/documentos';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.scss'],
})
export class EditarDocumentosComponent implements OnInit {
  /**
   * @INput contiene la información de la plantilla que se va a actualizar
   */
  @Input() plantillaActualizar: PlantillaDocumento = {} as PlantillaDocumento;

  /**
   * @Output emite el evento cuando se da click en cerrar el modal de crear documento
   */
  @Output() cerrarModalEditarDocumento = new EventEmitter<any>();

  /**
   * @Output emite el evento cuando se da click en cerrar el modal de crear documento
   */
  @Output() actualizarDocumentoSolicitado = new EventEmitter<any>();

  /**
   * @Formulario actualiza la información del documento que se solicitara a los empleados
   */
  solicitudDocumentoForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombreDocumento: new FormControl(''),
    especificaciones: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.solicitudDocumentoForm.patchValue({
      id: this.plantillaActualizar.id,
      nombreDocumento: this.plantillaActualizar.nombreDocumento,
      especificaciones: this.plantillaActualizar.especificaciones,
    });
  }
}
