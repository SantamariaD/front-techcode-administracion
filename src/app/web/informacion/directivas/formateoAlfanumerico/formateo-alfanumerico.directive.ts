import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormateoAlfanumerico]'
})
export class FormateoAlfanumericoDirective {

  constructor() {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9\s.,]/g, '');
    inputElement.value = sanitizedValue;
  }

}
