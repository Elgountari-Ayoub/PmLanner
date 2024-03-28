import { Injectable } from '@angular/core';
import { IWeeklyGoal } from '../Models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeeklyGoalService {
  private weeklyGoalsUrl = 'http://localhost:8080/api/v1/weekly-goals';
  constructor(private http: HttpClient) {}

  getGoals(): Observable<IWeeklyGoal[]> {
    return this.http.get<IWeeklyGoal[]>(this.weeklyGoalsUrl);
  }
  getGoal(id: number): Observable<IWeeklyGoal> {
    return this.http.get<IWeeklyGoal>(`${this.weeklyGoalsUrl}/${id}`);
  }

  create(weeklyGoal: IWeeklyGoal): Observable<IWeeklyGoal> {
    return this.http.post<IWeeklyGoal>(`${this.weeklyGoalsUrl}`, weeklyGoal);
  }
  edit(id?: number, weeklyGoal?: IWeeklyGoal): Observable<IWeeklyGoal> {
    return this.http.put<IWeeklyGoal>(
      `${this.weeklyGoalsUrl}/${id}`,
      weeklyGoal
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.weeklyGoalsUrl}/${id}`);
  }
}
