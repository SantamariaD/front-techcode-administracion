import { TestBed } from '@angular/core/testing';

import { CambioContraseñaService } from './cambio-contraseña.service';

describe('CambioContraseñaService', () => {
  let service: CambioContraseñaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioContraseñaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
