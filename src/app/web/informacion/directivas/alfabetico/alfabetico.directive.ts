import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlfabetico]',
})
export class AlfabeticoDirective {
  constructor() {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s.]/g, '');
    inputElement.value = sanitizedValue;
  }
}
