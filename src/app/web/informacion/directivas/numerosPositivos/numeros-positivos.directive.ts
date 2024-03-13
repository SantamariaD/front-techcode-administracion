import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumerosPositivos]'
})
export class NumerosPositivosDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
    inputElement.value = sanitizedValue;
  }

}
