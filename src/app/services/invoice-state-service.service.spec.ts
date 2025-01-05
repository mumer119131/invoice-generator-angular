import { TestBed } from '@angular/core/testing';

import { GeneratorServiceService } from './generator-service.service';

describe('GeneratorServiceService', () => {
  let service: GeneratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
