import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  saveGameSession(userId: number, score: number): Observable<any> {
    return this.http.post('http://localhost:3000/game-session/save', {
      userId,
      score,
    });
  }

  updateColor(userId: number, color: string): Observable<any> {
    return this.http.post('http://localhost:3000/update-color', {
      userId,
      color,
    });
  }
}
