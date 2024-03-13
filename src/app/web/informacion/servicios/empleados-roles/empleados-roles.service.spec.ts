import { TestBed } from '@angular/core/testing';

import { EmpleadosRolesService } from './empleados-roles.service';

describe('EmpleadosRolesService', () => {
  let service: EmpleadosRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
