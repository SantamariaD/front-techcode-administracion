import { TestBed } from '@angular/core/testing';

import { HorariosGeneralesService } from './horarios-generales.service';

describe('HorariosGeneralesService', () => {
  let service: HorariosGeneralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosGeneralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
