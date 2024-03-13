import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ComponentesModule } from './web/UX/componentes/componentes.module';
import { AppModule } from './app.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from './web/informacion/utils/shared.module';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { ErrorInterceptor } from './web/informacion/interceptor/errorHttp';
import { Store } from '@ngrx/store';
import { selectBanderaCargandoPeticion } from './web/informacion/state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    ComponentesModule,
    RouterLink,
    FormsModule,
    HttpClientModule,
    NzMenuModule,
    SharedModule,
    AppModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptionInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DesencriptadoInterceptor,
      multi: true
    }, */
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  spinerPeticion = false;
  login = false;

  constructor(private store: Store) {}

  ngDoCheck(): void {
    this.store
      .select(selectBanderaCargandoPeticion)
      .subscribe((bandera: boolean) => (this.spinerPeticion = bandera));
      this.login = localStorage.getItem('idEmpleado') || '' ? true : false;
  }
  /**
   * @Variable indica si se colapsa la sidebar
   */
  isCollapsed = true;

  abrirSider(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
