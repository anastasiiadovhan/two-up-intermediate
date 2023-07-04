import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/signup', {
      username,
      password,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string, userId: string }>('http://localhost:3000/auth/login', {
      username,
      password,
    }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.setUserId(res.userId);
      })
    );
  }

  logout(): void {
    // removes the token and effectively logs out the user
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    // check if token is present
    return !!localStorage.getItem('token');
  }
}
