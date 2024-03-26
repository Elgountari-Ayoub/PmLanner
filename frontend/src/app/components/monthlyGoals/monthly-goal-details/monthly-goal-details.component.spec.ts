import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalDetailsComponent } from './monthly-goal-details.component';

describe('MonthlyGoalDetailsComponent', () => {
  let component: MonthlyGoalDetailsComponent;
  let fixture: ComponentFixture<MonthlyGoalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyGoalDetailsComponent]
    });
    fixture = TestBed.createComponent(MonthlyGoalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
