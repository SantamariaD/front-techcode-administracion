import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormateoCuatroDigitos]'
})
export class FormateoCuatroDigitosDirective {

  constructor() {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
    inputElement.value = sanitizedValue.substring(0, 4);
  }

}
