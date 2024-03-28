import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDailyGoal } from '../Models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyGoalService {
  private dailyGoalsUrl = 'http://localhost:8080/api/v1/daily-goals';
  constructor(private http: HttpClient) {}

  getGoals(): Observable<IDailyGoal[]> {
    return this.http.get<IDailyGoal[]>(this.dailyGoalsUrl);
  }
  getGoal(id: number): Observable<IDailyGoal> {
    return this.http.get<IDailyGoal>(`${this.dailyGoalsUrl}/${id}`);
  }
  create(annualGoal: IDailyGoal): Observable<IDailyGoal> {
    return this.http.post<IDailyGoal>(`${this.dailyGoalsUrl}`, annualGoal);
  }
  edit(id?: number, annualGoal?: IDailyGoal): Observable<IDailyGoal> {
    return this.http.put<IDailyGoal>(`${this.dailyGoalsUrl}/${id}`, annualGoal);
  }
  delete(id: number) {
    return this.http.delete(`${this.dailyGoalsUrl}/${id}`);
  }
}
