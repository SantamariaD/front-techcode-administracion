import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusTrabajoComponent } from './estatus-trabajo.component';

describe('EstatusTrabajoComponent', () => {
  let component: EstatusTrabajoComponent;
  let fixture: ComponentFixture<EstatusTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatusTrabajoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstatusTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
