import { TestBed } from '@angular/core/testing';

import { AnnualGoalsService } from './annual-goals.service';

describe('AnnualGoalsService', () => {
  let service: AnnualGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
