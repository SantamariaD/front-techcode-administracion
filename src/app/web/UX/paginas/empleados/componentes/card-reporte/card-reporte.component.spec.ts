import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReporteComponent } from './card-reporte.component';

describe('CardReporteComponent', () => {
  let component: CardReporteComponent;
  let fixture: ComponentFixture<CardReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
