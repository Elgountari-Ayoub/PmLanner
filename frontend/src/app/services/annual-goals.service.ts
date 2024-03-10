import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnualGoals } from '../Models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnnualGoalsService {
  private annualGoalsUrl = 'http://localhost:8080/api/v1/annual-goals';
  constructor(private http: HttpClient){}

  getAnnualGoals() : Observable<IAnnualGoals[]>{
    return this.http.get<IAnnualGoals[]>(this.annualGoalsUrl);
  }
}
