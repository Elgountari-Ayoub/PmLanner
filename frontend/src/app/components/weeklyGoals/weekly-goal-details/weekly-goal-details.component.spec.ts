import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalDetailsComponent } from './weekly-goal-details.component';

describe('WeeklyGoalDetailsComponent', () => {
  let component: WeeklyGoalDetailsComponent;
  let fixture: ComponentFixture<WeeklyGoalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyGoalDetailsComponent]
    });
    fixture = TestBed.createComponent(WeeklyGoalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
