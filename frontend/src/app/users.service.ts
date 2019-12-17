import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class UserService {

  protected endPoint = 'http://localhost:3000/users';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  add(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${this.endPoint}`, user, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.endPoint}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  deleteUser(regId: number): Observable<User> {
    return this.httpClient
    .delete<User>(`${this.endPoint}/${regId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient
    .get<User>(`${this.endPoint}/${userId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient
    .get<User>(`${this.endPoint}?username=${username}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}