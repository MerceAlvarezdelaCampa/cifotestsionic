import { TestBed } from '@angular/core/testing';

import { VacancesService } from './vacances.service';

describe('VacancesService', () => {
  let service: VacancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
