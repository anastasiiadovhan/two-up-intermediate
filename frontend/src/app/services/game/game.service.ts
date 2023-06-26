import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  saveGameSession(userId: number, score: number): Observable<any> {
    return this.http.post('http://localhost:3000/game-sessions/save', {
      userId,
      score,
    });
  }

  updateColor(userId: number, color: string): Observable<any> {
    return this.http.post('http://localhost:3000/game-sessions/update-color', {
      userId,
      color: color.trim(),
    });
  }

  getColor(userId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/game-sessions/get-color/${userId}`);
  }

  getLeaderboard(): Observable<any> {
    return this.http.get('http://localhost:3000/leaderboard');
  }  
}
