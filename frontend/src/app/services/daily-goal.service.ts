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
  getTodayGoals(): Observable<IDailyGoal[]> {
    return this.http.get<IDailyGoal[]>(`${this.dailyGoalsUrl}/today`);
  }
  create(dailyGoal: IDailyGoal): Observable<IDailyGoal> {
    return this.http.post<IDailyGoal>(`${this.dailyGoalsUrl}`, dailyGoal);
  }
  edit(id?: number, dailyGoal?: IDailyGoal): Observable<IDailyGoal> {
    console.log(dailyGoal);
    
    return this.http.put<IDailyGoal>(`${this.dailyGoalsUrl}/${id}`, dailyGoal);
  }
  delete(id: number) {
    return this.http.delete(`${this.dailyGoalsUrl}/${id}`);
  }
}
