import { TestBed } from '@angular/core/testing';

import { WeeklyGoalService } from './weekly-goal.service';

describe('WeeklyGoalService', () => {
  let service: WeeklyGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
