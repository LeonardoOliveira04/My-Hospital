import { TestBed } from '@angular/core/testing';

import { FireauthService } from './fire-auth-service.service';

describe('FireAuthServiceService', () => {
  let service: FireauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
