import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesCabeceraComponent } from './secciones-cabecera.component';

describe('SeccionesCabeceraComponent', () => {
  let component: SeccionesCabeceraComponent;
  let fixture: ComponentFixture<SeccionesCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionesCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionesCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
