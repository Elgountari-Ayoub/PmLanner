import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnualGoal } from '../Models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnnualGoalsService {
  private annualGoalsUrl = 'http://localhost:8080/api/v1/annual-goals';
  constructor(private http: HttpClient){}

  getGoals() : Observable<IAnnualGoal[]>{
    return this.http.get<IAnnualGoal[]>(this.annualGoalsUrl);
  }
  create(annualGoal: IAnnualGoal): Observable<IAnnualGoal> {
    return this.http.post<IAnnualGoal>(`${this.annualGoalsUrl}`, annualGoal);
  }
  edit(id?: number, annualGoal?: IAnnualGoal): Observable<IAnnualGoal> {
    return this.http.put<IAnnualGoal>(`${this.annualGoalsUrl}/${id}`, annualGoal);
  }

  delete(id: number) {
    return this.http.delete(`${this.annualGoalsUrl}/${id}`);
  }
}
