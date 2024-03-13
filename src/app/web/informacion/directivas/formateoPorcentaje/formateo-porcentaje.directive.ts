import { Directive, ElementRef, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormateoPorcentaje]',
})
export class FormateoPorcentajeDirective {
  constructor(private el: ElementRef, @Self() private ngControl: NgControl) {}

  ngOnInit(): void {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatPercentage(value);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.nativeElement.value = value.replace(/[^0-9.$]/g, '');
  }

  @HostListener('focus')
  onFocus() {
    const largo = this.el.nativeElement.value.length;
    this.el.nativeElement.setSelectionRange(0, largo);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const formattedValue = this.formatPercentage(numericValue);
    this.el.nativeElement.value = formattedValue;

    if (!value || parseFloat(value) > 100) this.el.nativeElement.value = '';

    this.ngControl?.control?.setValue(formattedValue || '', { emitEvent: true });
  }

  private formatPercentage(value: string): string {
    const number = parseFloat(value);
    let formattedNumber = number.toFixed(2);
    return `${formattedNumber}%`;
  }
}
