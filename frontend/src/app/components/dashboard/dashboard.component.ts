import { Component, OnInit } from '@angular/core';
import { IAnnualGoals } from 'src/app/Models/interfaces';
import { AnnualGoalsService } from 'src/app/services/annual-goals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
  annualGoals: IAnnualGoals[] = [];
  constructor(private annualGoalService: AnnualGoalsService){}
  ngOnInit(): void {
    this.getAnnualGoals();
  }

  getAnnualGoals(){
    this.annualGoalService.getAnnualGoals().subscribe({
      next: data => {
        this.annualGoals = data as IAnnualGoals[];
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
