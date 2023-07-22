import { TestBed } from '@angular/core/testing';

import { QrserviceService } from './qrservice.service';

describe('QrserviceService', () => {
  let service: QrserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
