import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icono-archivo',
  standalone: false,
  templateUrl: './icono-archivo.component.html',
  styleUrls: ['./icono-archivo.component.scss']
})
export class IconoArchivoComponent implements OnInit {
  /**
   * @entrada tipoArchivo: Indica el icono para el tipo de archivo que corresponde
   */
  @Input()tipoArchivo: string = 'file';

  /**
   * @entrada tamanoIcono: Indica el tamaño del icono en px
   */

  @Input()tamanoIcono: string = '15';
   /**
    * @variable tamano: define el tamaño del icono en el html
    */
  tamano = '0';

  constructor() { }

  ngOnInit(): void {
    this.tamano = `font-size: ${this.tamanoIcono}px;`;
  }

}
