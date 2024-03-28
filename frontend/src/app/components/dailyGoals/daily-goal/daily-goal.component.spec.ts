import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyGoalComponent } from './daily-goal.component';

describe('DailyGoalComponent', () => {
  let component: DailyGoalComponent;
  let fixture: ComponentFixture<DailyGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyGoalComponent]
    });
    fixture = TestBed.createComponent(DailyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
