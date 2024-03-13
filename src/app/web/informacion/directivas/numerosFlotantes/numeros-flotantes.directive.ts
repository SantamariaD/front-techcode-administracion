import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumerosFlotantes]'
})
export class NumerosFlotantesDirective {

  constructor() {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
    const parts = sanitizedValue.split('.');
    const decimalPart = parts.length > 1 ? `.${parts[1].slice(0, 3)}` : '';
    const formattedValue = parts[0] + decimalPart;

    inputElement.value = formattedValue;
  }
}
