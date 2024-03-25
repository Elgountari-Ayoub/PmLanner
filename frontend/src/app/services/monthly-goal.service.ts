import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMonthlyGoal } from '../Models/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MonthlyGoalService {
  private monthlyGoalsUrl = 'http://localhost:8080/api/v1/monthly-goals';
  constructor(private http: HttpClient){}

  getMonthlyGoals() : Observable<IMonthlyGoal[]>{
    return this.http.get<IMonthlyGoal[]>(this.monthlyGoalsUrl);
  }

  create(annualGoal: IMonthlyGoal): Observable<IMonthlyGoal> {
    return this.http.post<IMonthlyGoal>(`${this.monthlyGoalsUrl}`, annualGoal);
  }
  edit(id?: number, annualGoal?: IMonthlyGoal): Observable<IMonthlyGoal> {
    return this.http.put<IMonthlyGoal>(`${this.monthlyGoalsUrl}/${id}`, annualGoal);
  }

  delete(id: number) {
    return this.http.delete(`${this.monthlyGoalsUrl}/${id}`);
  }
}
