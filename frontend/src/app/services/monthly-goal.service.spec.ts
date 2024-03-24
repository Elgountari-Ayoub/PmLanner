import { TestBed } from '@angular/core/testing';

import { MonthlyGoalService } from './monthly-goal.service';

describe('MonthlyGoalService', () => {
  let service: MonthlyGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
