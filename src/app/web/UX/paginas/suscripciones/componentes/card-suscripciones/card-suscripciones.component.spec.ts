import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSuscripcionesComponent } from './card-suscripciones.component';

describe('CardSuscripcionesComponent', () => {
  let component: CardSuscripcionesComponent;
  let fixture: ComponentFixture<CardSuscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSuscripcionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
