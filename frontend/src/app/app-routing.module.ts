import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { AnnualGoalDetailsComponent } from './components/annualGoals/annual-goal-details/annual-goal-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'annualGoal/:annualGoalId',
    component: AnnualGoalDetailsComponent,
  },
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
