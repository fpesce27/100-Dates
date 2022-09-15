import { TestBed } from '@angular/core/testing';

import { CargandoServiceService } from './cargando-service.service';

describe('CargandoServiceService', () => {
  let service: CargandoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargandoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
