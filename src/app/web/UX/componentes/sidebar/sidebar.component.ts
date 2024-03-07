import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  /**
   * @Output emite si se colapsa la sidebar
   */
  @Output() abrirSiderEmit = new EventEmitter<any>();

  isCollapsed = true;

  abrirSider(): void {
    this.isCollapsed = !this.isCollapsed;
    this.abrirSiderEmit.emit();
  }
}
