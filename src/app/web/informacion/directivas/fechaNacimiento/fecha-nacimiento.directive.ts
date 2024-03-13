import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFechaNacimiento]',
})
export class FechaNacimientoDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      if (value.length >= 5) {
        value = value.slice(0, 5) + '/' + value.slice(5);
      }
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }

    input.value = value;
  }
}
