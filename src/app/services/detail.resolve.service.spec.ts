import { TestBed } from '@angular/core/testing';

import { DetailResolveService } from './detail.resolve.service';

describe('DetailResolveService', () => {
  let service: DetailResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
