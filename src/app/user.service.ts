import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Question } from './question.model';
import { Observable } from 'rxjs';
import { Answer } from './answer.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUserName: string = '';
    private baseUrl = 'http://localhost:3000'; // Replace with the actual path

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/questions`);
  }

  // submitAnswers(answers: Answer[]): Observable<any> {
  //   return this.http.post<Answer[]>(`${this.baseUrl}/submit-answers`,  answers);
  // }
  submitAnswers(answers: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit-answers`,  answers);
  }

  getResults(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-results`);
  }
}