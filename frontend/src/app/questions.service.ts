import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';
import { Question } from './question.model';

@Injectable()
export class QuestionService {

  protected endPoint = 'http://localhost:3000/questions';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  add(q: Question): Observable<Question> {
    return this.httpClient
      .post<Question>(`${this.endPoint}`, q, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getQuestions(): Observable<Question[]> {
    return this.httpClient
      .get<Question[]>(`${this.endPoint}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  deleteQuestion(regId: number): Observable<User> {
    return this.httpClient
    .delete<User>(`${this.endPoint}/${regId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getQuestionById(userId: number): Observable<Question> {
    return this.httpClient
    .get<Question>(`${this.endPoint}?user_id=${userId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getUserByUsername(username: string): Observable<Question> {
    return this.httpClient
    .get<Question>(`${this.endPoint}?username=${username}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}