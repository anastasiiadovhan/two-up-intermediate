import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  leaderboard: any[] = [];
  userScore: any = null;
  userId: any = null;

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchLeaderboard();
    this.fetchUserScore();
  }

  fetchLeaderboard() {
    this.gameService.getLeaderboard().subscribe({
      next: data => {
        this.leaderboard = data;
      },
      error: error => {
        console.error('Error fetching leaderboard data', error);
      },
      complete: () => {
        console.log('Leaderboard fetch completed');
      }
    });
  }  

  fetchUserScore() {
    this.userId = this.authService.getUserId(); // get the user id
    this.gameService.getUserHighestScore(this.userId).subscribe({
      next: data => {
        this.userScore = data;
      },
      error: error => {
        console.error('Error fetching user score', error);
      },
      complete: () => {
        console.log('User score fetch completed');
      }
    });
  }
}
