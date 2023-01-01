import { TestBed } from '@angular/core/testing';

import { NombresService } from './nombres.service';

describe('NombresService', () => {
  let service: NombresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
