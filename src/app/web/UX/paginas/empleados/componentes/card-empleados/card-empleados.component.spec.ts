import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmpleadosComponent } from './card-empleados.component';

describe('CardEmpleadosComponent', () => {
  let component: CardEmpleadosComponent;
  let fixture: ComponentFixture<CardEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
