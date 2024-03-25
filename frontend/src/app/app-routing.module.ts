import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { AnnualGoalMonthlyGoalsComponent } from './components/annual-goal-monthly-goals/annual-goal-monthly-goals.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'annualGoalMonthlyGoals/:annualGoalId',
    component: AnnualGoalMonthlyGoalsComponent,
  },
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
