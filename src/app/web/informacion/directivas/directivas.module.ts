import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormateoPorcentajeDirective } from './formateoPorcentaje/formateo-porcentaje.directive';
import { FormateoMonedaDirective } from './formateoMoneda/formateo-moneda.directive';
import { NumerosPositivosDirective } from './numerosPositivos/numeros-positivos.directive';
import { NumerosPositivosDecimalesDirective } from './numerosPositivosDecimales/numeros-positivos-decimales.directive';
import { FormateoCuatroDigitosDirective } from './formateoCuatroDigitos/formateo-cuatro-digitos.directive';
import { FormateoAlfanumericoDirective } from './formateoAlfanumerico/formateo-alfanumerico.directive';
import { DobleClickDirective } from './dobleClick/doble-click.directive';
import { CurpDirective } from './curp/curp.directive';
import { RfcDirective } from './rfc/rfc.directive';
import { AlfabeticoDirective } from './alfabetico/alfabetico.directive';
import { FechaNacimientoDirective } from './fechaNacimiento/fecha-nacimiento.directive';
import { NumerosFlotantesDirective } from './numerosFlotantes/numeros-flotantes.directive';
import { FormateoDescripcionesDirective } from './formateoDescripciones/formateo-descripciones.directive';

@NgModule({
  declarations: [
    FormateoPorcentajeDirective,
    FormateoMonedaDirective,
    NumerosPositivosDirective,
    NumerosPositivosDecimalesDirective,
    FormateoCuatroDigitosDirective,
    FormateoAlfanumericoDirective,
    DobleClickDirective,
    CurpDirective,
    RfcDirective,
    AlfabeticoDirective,
    FechaNacimientoDirective,
    NumerosFlotantesDirective,
    FormateoDescripcionesDirective
  ],
  exports: [
    FormateoPorcentajeDirective,
    FormateoMonedaDirective,
    NumerosPositivosDirective,
    NumerosPositivosDecimalesDirective,
    FormateoCuatroDigitosDirective,
    FormateoAlfanumericoDirective,
    DobleClickDirective,
    CurpDirective,
    RfcDirective,
    AlfabeticoDirective,
    FechaNacimientoDirective,
    NumerosFlotantesDirective,
    FormateoDescripcionesDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivasModule { }
