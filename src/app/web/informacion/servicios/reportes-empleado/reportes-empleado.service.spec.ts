import { TestBed } from '@angular/core/testing';

import { ReportesEmpleadoService } from './reportes-empleado.service';

describe('ReportesEmpleadoService', () => {
  let service: ReportesEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
