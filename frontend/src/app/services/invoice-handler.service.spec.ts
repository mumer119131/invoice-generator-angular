import { TestBed } from '@angular/core/testing';

import { InvoiceHandlerService } from './invoice-handler.service';

describe('InvoiceHandlerService', () => {
  let service: InvoiceHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
