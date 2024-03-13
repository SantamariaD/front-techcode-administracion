import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurp]',
})
export class CurpDirective {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('input', ['$event.target.value'])
  onInput() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value.toUpperCase();
    this.el.nativeElement.value = inputElement.value.toUpperCase();
    const regexPrimerNombre = /^[A-Z]{1,4}$/;
    const regexFechaNacimiento = /^\d{1,6}$/;
    const regexHombreMujer = /^[HM]$/;
    const regexEntidadNacimiento = /^[A-Z]{1,6}$/;
    const regexDigitoVerificador = /^\d{1,2}$/;
    let cadenaPartida = '';

    switch (true) {
      case inputValue.length <= 4:
        if (!regexPrimerNombre.test(inputValue))
          this.el.nativeElement.value = inputValue.slice(0, -1);
        break;
      case inputValue.length > 4 && inputValue.length <= 10:
        cadenaPartida = inputValue.substring(4, 10);
        if (!regexFechaNacimiento.test(cadenaPartida))
          this.el.nativeElement.value = inputValue.slice(0, -1);
        break;
      case inputValue.length >= 10 && inputValue.length <= 11:
        cadenaPartida = inputValue.substring(10, 11);
        if (!regexHombreMujer.test(cadenaPartida))
          this.el.nativeElement.value = inputValue.slice(0, -1);
        break;
      case inputValue.length >= 11 && inputValue.length <= 16:
        cadenaPartida = inputValue.substring(11, 13);
        if (!regexEntidadNacimiento.test(cadenaPartida))
          this.el.nativeElement.value = inputValue.slice(0, -1);
        break;
      case inputValue.length >= 16 && inputValue.length <= 18:
        cadenaPartida = inputValue.substring(16, 18);
        if (!regexDigitoVerificador.test(cadenaPartida))
          this.el.nativeElement.value = inputValue.slice(0, -1);
        break;
      default:
        break;
    }
  }

  @HostListener('focus')
  onFocus() {
    const largo = this.el.nativeElement.value.length;
    this.el.nativeElement.setSelectionRange(0, largo);
  }
}
