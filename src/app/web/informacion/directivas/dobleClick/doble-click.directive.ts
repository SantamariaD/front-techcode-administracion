import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[doblelClick]',
})
export class DobleClickDirective {
  @Output() doblelClick: EventEmitter<any> = new EventEmitter();

  private clicks = 0;
  private timer: any;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.clicks++;

    if (this.clicks === 1) {
      this.timer = setTimeout(() => {
        this.clicks = 0;
      }, 300); // Tiempo para detectar el doble clic (300 ms)
    } else if (this.clicks === 2) {
      clearTimeout(this.timer);
      this.clicks = 0;
      this.doblelClick.emit(event);
    }
  }
}
