import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumerosPositivosDecimales]',
})
export class NumerosPositivosDecimalesDirective {
  private hasDecimal = false;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
    const parts = sanitizedValue.split('.');

    if (parts.length > 1) {
      inputElement.value = parts[0] + '.' + parts[1].substring(0, 3);
      return;
    }

    inputElement.value = sanitizedValue;
  }
}
