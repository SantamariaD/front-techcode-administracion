import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateoFecha',
  standalone: false,
})
export class FormateoFechaPipe implements PipeTransform {
  transform(value: any): string {
    if (!value || new Date(value).toString() === 'Invalid Date') return '';

    const fecha = new Date(value);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}-${mes}-${anio}`;
  }
}
