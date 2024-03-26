import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualGoalComponent } from './annual-goal.component';

describe('AnnualGoalComponent', () => {
  let component: AnnualGoalComponent;
  let fixture: ComponentFixture<AnnualGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualGoalComponent]
    });
    fixture = TestBed.createComponent(AnnualGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
