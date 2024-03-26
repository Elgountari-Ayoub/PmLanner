import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualGoalDetailsComponent } from './annual-goal-details.component';

describe('AnnualGoalDetailsComponent', () => {
  let component: AnnualGoalDetailsComponent;
  let fixture: ComponentFixture<AnnualGoalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualGoalDetailsComponent]
    });
    fixture = TestBed.createComponent(AnnualGoalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
