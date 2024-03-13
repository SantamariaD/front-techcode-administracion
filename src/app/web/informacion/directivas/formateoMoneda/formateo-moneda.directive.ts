import { Directive, ElementRef, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormateoMoneda]',
})
export class FormateoMonedaDirective {
  constructor(private el: ElementRef, @Self() private ngControl: NgControl) {}

  ngOnInit(): void {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formateoMoneda(value);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.nativeElement.value = value.replace(/[^0-9.$]/g, '');
  }

  @HostListener('focus')
  onFocus() {
    const largo = this.el.nativeElement.value.length;
    this.el.nativeElement.setSelectionRange(1, largo);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const formattedValue = this.formateoMoneda(numericValue) as string;
    
    this.ngControl?.control?.setValue(formattedValue || '', { emitEvent: true });
  }

  private formateoMoneda(value: string): string {
    const number = parseFloat(value);
    const formattedNumber = number.toFixed(2);
    let formattedValue = `$${formattedNumber}`;

    if (!value) formattedValue = '';

    const parts = formattedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formattedValue = parts.join('.');

    return formattedValue;
  }
}
