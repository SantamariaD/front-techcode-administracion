import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SharedModule } from '../../informacion/utilidades/shared.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';
import { SeccionesCabeceraComponent } from './secciones-cabecera/secciones-cabecera.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconoArchivoComponent } from './icono-archivo/icono-archivo.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TablaComponent,
    SeccionesCabeceraComponent,
    IconoArchivoComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TablaComponent,
    SeccionesCabeceraComponent,
    IconoArchivoComponent
  ],
})
export class ComponentesModule {}
