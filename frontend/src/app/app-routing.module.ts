import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { AnnualGoalDetailsComponent } from './components/annualGoals/annual-goal-details/annual-goal-details.component';
import { MonthlyGoalDetailsComponent } from './components/monthlyGoals/monthly-goal-details/monthly-goal-details.component';
import { WeeklyGoalDetailsComponent } from './components/weeklyGoals/weekly-goal-details/weekly-goal-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { authenticationGuard } from './guards/authentication/authentication.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authenticationGuard] },
  {
    path: 'annualGoal/:annualGoalId',
    component: AnnualGoalDetailsComponent,
  },
  {
    path: 'monthlyGoal/:monthlyGoalId',
    component: MonthlyGoalDetailsComponent,
  },
  {
    path: 'weeklyGoal/:weeklyGoalId',
    component: WeeklyGoalDetailsComponent,
  },
  { path: '', component: LandingComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
