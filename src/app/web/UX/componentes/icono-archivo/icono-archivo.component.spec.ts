import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoArchivoComponent } from './icono-archivo.component';

describe('IconoArchivoComponent', () => {
  let component: IconoArchivoComponent;
  let fixture: ComponentFixture<IconoArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconoArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconoArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
