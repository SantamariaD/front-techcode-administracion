import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormateoDescripciones]',
  standalone: false,
})
export class FormateoDescripcionesDirective {
  constructor() {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(
      /[^a-zA-Z0-9\s.,;:?!\-_'(){}\[\]"+=%@#]/g,
      ''
    );
    inputElement.value = sanitizedValue;
  }
}
