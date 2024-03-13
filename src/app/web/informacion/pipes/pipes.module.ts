import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormateoMonedaPipe } from './formateoMoneda/formateo-moneda.pipe';
import { FormateoFechaPipe } from './formateoFecha/formateo-fecha.pipe';



@NgModule({
  declarations: [
    FormateoMonedaPipe,
    FormateoFechaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormateoMonedaPipe,
    FormateoFechaPipe
  ]
})
export class PipesModule { }
