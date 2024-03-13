import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateoMoneda',
})
export class FormateoMonedaPipe implements PipeTransform {
  transform(value: any): string {
    if (isNaN(value)) return '';

    if (typeof value == 'string') value = parseFloat(value);
    
    const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `$${formattedValue}`;
  }
}
