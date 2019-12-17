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
