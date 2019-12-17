import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getQuestions() {
    return this.http.get(`${this.uri}/questions`);
  }

  getUserById(id) {
    return this.http.get(`${this.uri}/users/${id}`);
  }

  addUser(name, email, username, password) {
    const user = {
      name: name,
      email: email,
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/users/add`, user);
  }

  addQuestion(question, c1, c2, c3) {
    const ques = {
      question: question,
      choice1: c1,
      choice2: c2,
      choice: c3
    };
    return this.http.post(`${this.uri}/users/add`, ques);
  }

  updateUser(id, name, email, username, password) {
    const user = {
        name: name,
        email: email,
        username: username,
        password: password
    };
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(id) {
    return this.http.get(`${this.uri}/users/delete/${id}`);
  }
}
