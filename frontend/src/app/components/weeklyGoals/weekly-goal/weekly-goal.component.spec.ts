import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalComponent } from './weekly-goal.component';

describe('WeeklyGoalComponent', () => {
  let component: WeeklyGoalComponent;
  let fixture: ComponentFixture<WeeklyGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyGoalComponent]
    });
    fixture = TestBed.createComponent(WeeklyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
