import { TestBed } from '@angular/core/testing';

import { ServicePersonajeService } from './service-personaje.service';

describe('ServicePersonajeService', () => {
  let service: ServicePersonajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePersonajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
