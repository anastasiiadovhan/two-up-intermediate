import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/signup', {
      username,
      password,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', {
      username,
      password,
    });
  }
}
