import { Injectable } from '@angular/core';
import { IWeeklyGoal } from '../Models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeeklyGoalService {
  private annualGoalsUrl = 'http://localhost:8080/api/v1/weekly-goals';
  constructor(private http: HttpClient) {}

  getGoals(): Observable<IWeeklyGoal[]> {
    return this.http.get<IWeeklyGoal[]>(this.annualGoalsUrl);
  }
  create(annualGoal: IWeeklyGoal): Observable<IWeeklyGoal> {
    return this.http.post<IWeeklyGoal>(`${this.annualGoalsUrl}`, annualGoal);
  }
  edit(id?: number, annualGoal?: IWeeklyGoal): Observable<IWeeklyGoal> {
    return this.http.put<IWeeklyGoal>(
      `${this.annualGoalsUrl}/${id}`,
      annualGoal
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.annualGoalsUrl}/${id}`);
  }
}
