import { TestBed } from '@angular/core/testing';

import { CatalogoBancosService } from './catalogo-bancos.service';

describe('CatalogoBancosService', () => {
  let service: CatalogoBancosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoBancosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
