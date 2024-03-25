import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualGoalMonthlyGoalsComponent } from './annual-goal-monthly-goals.component';

describe('AnnualGoalMonthlyGoalsComponent', () => {
  let component: AnnualGoalMonthlyGoalsComponent;
  let fixture: ComponentFixture<AnnualGoalMonthlyGoalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualGoalMonthlyGoalsComponent]
    });
    fixture = TestBed.createComponent(AnnualGoalMonthlyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
