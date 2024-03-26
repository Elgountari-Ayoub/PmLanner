import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/includes/navbar/navbar.component';
import { SidebarComponent } from './components/includes/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { LandingComponent } from './components/landing/landing.component';
import { AnnualGoalDetailsComponent } from './components/annualGoals/annual-goal-details/annual-goal-details.component';
import { AnnualGoalComponent } from './components/annualGoals/annual-goal/annual-goal.component';
import { MonthlyGoalDetailsComponent } from './components/monthlyGoals/monthly-goal-details/monthly-goal-details.component';
import { MonthlyGoalComponent } from './components/monthlyGoals/monthly-goal/monthly-goal.component';
import { WeeklyGoalComponent } from './components/weeklyGoals/weekly-goal/weekly-goal.component';
import { WeeklyGoalDetailsComponent } from './components/weeklyGoals/weekly-goal-details/weekly-goal-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    LandingComponent,
    AnnualGoalComponent,
    AnnualGoalDetailsComponent,
    MonthlyGoalComponent,
    MonthlyGoalDetailsComponent,
    WeeklyGoalComponent,
    WeeklyGoalDetailsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
